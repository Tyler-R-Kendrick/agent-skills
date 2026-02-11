# Rebus

## Overview
Rebus is a lean service bus implementation for .NET supporting various transports and patterns.

## Example
```csharp
using Rebus.Config;
using Rebus.Handlers;

// Configure bus
services.AddRebus(configure => configure
    .Transport(t => t.UseRabbitMq("amqp://localhost", "my-queue"))
    .Routing(r => r.TypeBased()
        .Map<OrderPlaced>("orders-queue")));

// Handler
public class OrderPlacedHandler : IHandleMessages<OrderPlaced>
{
    public async Task Handle(OrderPlaced message)
    {
        await ProcessOrder(message.OrderId);
    }
}

// Send message
await bus.Send(new OrderPlaced { OrderId = 123 });

// Publish event
await bus.Publish(new OrderCompleted { OrderId = 123 });
```

## Best Practices
- Use sagas for long-running workflows
- Implement idempotent handlers
- Configure retries appropriately
- Use correlation IDs
