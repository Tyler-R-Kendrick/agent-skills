---
name: event-driven-cheatsheet
description: Guidance for event-driven architecture patterns and best practices. Use when working with event-driven systems.
license: MIT
metadata:
  displayName: "Event-Driven Cheatsheet"
  author: "Tyler-R-Kendrick"
---

# Event-Driven Cheatsheet

## Overview
Event-driven architecture (EDA) enables loosely coupled, scalable systems by communicating through events rather than direct calls.

## Core Principles

- **Events are facts**: Represent something that happened in the past (e.g., `OrderPlaced`, `PaymentProcessed`).
- **Publishers don't know subscribers**: Decouple producers from consumers via event bus/broker.
- **Idempotency**: Handlers must safely process duplicate events.
- **Eventually consistent**: Accept that data may be temporarily inconsistent across services.

## Event Types

### Domain Events
Internal events within bounded contexts. Represent state changes in your domain.

```csharp
public record OrderPlaced(Guid OrderId, DateTimeOffset PlacedAt, decimal Total);
```

### Integration Events
Cross-bounded-context or cross-service events. Communicate between systems.

```csharp
public record OrderShipped(Guid OrderId, DateTimeOffset ShippedAt, string TrackingNumber);
```

### Event Notification vs Event-Carried State Transfer

**Event Notification**: Minimal payload, consumers fetch details if needed.
```csharp
public record ProductUpdated(Guid ProductId);
```

**Event-Carried State Transfer**: Full state in event, no additional query needed.
```csharp
public record ProductUpdated(Guid ProductId, string Name, decimal Price, int Stock);
```

## Event Sourcing

Store all state changes as a sequence of events rather than current state.

```csharp
public abstract record OrderEvent(Guid OrderId);
public record OrderCreated(Guid OrderId, Guid CustomerId) : OrderEvent(OrderId);
public record OrderItemAdded(Guid OrderId, Guid ProductId, int Quantity) : OrderEvent(OrderId);
public record OrderConfirmed(Guid OrderId) : OrderEvent(OrderId);

public class Order
{
    private readonly List<OrderEvent> _events = new();
    
    public void Apply(OrderEvent @event)
    {
        _events.Add(@event);
        When(@event);
    }
    
    private void When(OrderEvent @event) => @event switch
    {
        OrderCreated e => CustomerId = e.CustomerId,
        OrderItemAdded e => Items.Add(new OrderItem(e.ProductId, e.Quantity)),
        OrderConfirmed e => Status = OrderStatus.Confirmed,
        _ => throw new NotSupportedException()
    };
}
```

## Outbox Pattern

Ensure atomic writes to database and event publication.

```csharp
public class OrderService
{
    private readonly DbContext _context;
    
    public async Task PlaceOrderAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.OutboxMessages.AddAsync(new OutboxMessage
        {
            EventType = nameof(OrderPlaced),
            Payload = JsonSerializer.Serialize(new OrderPlaced(order.Id, DateTimeOffset.UtcNow, order.Total))
        });
        
        await _context.SaveChangesAsync();
    }
}
```

Background worker publishes events from outbox.

## Saga/Process Manager

Coordinate long-running transactions across services.

```csharp
public class OrderSaga
{
    public async Task HandleAsync(OrderPlaced @event)
    {
        await ReserveInventory(@event.OrderId);
    }
    
    public async Task HandleAsync(InventoryReserved @event)
    {
        await ChargePayment(@event.OrderId);
    }
    
    public async Task HandleAsync(PaymentCharged @event)
    {
        await ShipOrder(@event.OrderId);
    }
    
    public async Task HandleAsync(PaymentFailed @event)
    {
        await ReleaseInventory(@event.OrderId);
        await CancelOrder(@event.OrderId);
    }
}
```

## Command Query Responsibility Segregation (CQRS)

Separate read and write models. Commands change state, queries read state.

```csharp
// Command side
public record CreateOrder(Guid CustomerId, List<OrderItem> Items);

public class OrderCommandHandler
{
    public async Task<Guid> HandleAsync(CreateOrder command)
    {
        var order = new Order(Guid.NewGuid(), command.CustomerId);
        // Save and publish events
        return order.Id;
    }
}

// Query side (denormalized read model)
public class OrderQueryService
{
    public async Task<OrderDto> GetOrderAsync(Guid orderId)
    {
        // Read from optimized read store
        return await _readStore.GetOrderAsync(orderId);
    }
}
```

## Event Versioning

Handle schema evolution with version fields.

```csharp
public abstract record Event(int Version);

public record OrderPlacedV1(Guid OrderId) : Event(1);

public record OrderPlacedV2(Guid OrderId, Guid CustomerId, decimal Total) : Event(2);

public class OrderEventHandler
{
    public async Task HandleAsync(Event @event)
    {
        var orderPlaced = @event switch
        {
            OrderPlacedV1 v1 => new OrderPlacedV2(v1.OrderId, Guid.Empty, 0m),
            OrderPlacedV2 v2 => v2,
            _ => throw new NotSupportedException()
        };
        
        await ProcessAsync(orderPlaced);
    }
}
```

## Guidance

- Prefer MassTransit, NServiceBus, or Wolverine for .NET event-driven systems.
- Use the Outbox pattern for transactional consistency.
- Make event handlers idempotent using deduplication keys.
- Include correlation IDs and causation IDs for tracing.
- Version events from the start with a Version field.
- Choose event notification vs event-carried state based on coupling and latency requirements.
- Use CQRS when read and write patterns differ significantly.
- Implement retry and dead-letter queues for fault tolerance.
