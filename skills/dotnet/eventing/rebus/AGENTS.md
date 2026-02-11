# Rebus

## Overview
Rebus is a lean, open-source .NET service bus library that implements messaging patterns including pub/sub, request/reply, and sagas. It is transport-agnostic with plugins for RabbitMQ, Azure Service Bus, Amazon SQS, SQL Server, and in-memory. Rebus emphasizes simplicity and composability, making it a practical choice for teams that want a lightweight alternative to MassTransit or NServiceBus without sacrificing reliability features like automatic retries, second-level retries, and deferred message delivery.

## NuGet Packages
- `Rebus` -- core library
- `Rebus.ServiceProvider` -- Microsoft.Extensions.DependencyInjection integration
- `Rebus.RabbitMq` -- RabbitMQ transport
- `Rebus.AzureServiceBus` -- Azure Service Bus transport
- `Rebus.AmazonSQS` -- Amazon SQS transport
- `Rebus.SqlServer` -- SQL Server transport, sagas, and subscriptions
- `Rebus.Serilog` -- Serilog logging integration

## Basic Setup
```csharp
using Rebus.Config;
using Rebus.Routing.TypeBased;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRebus(configure => configure
    .Transport(t => t.UseRabbitMq(
        "amqp://guest:guest@localhost", "order-service"))
    .Routing(r => r.TypeBased()
        .Map<PlaceOrder>("order-service")
        .Map<BillOrder>("billing-service")
        .Map<ShipOrder>("shipping-service"))
    .Options(o =>
    {
        o.SetNumberOfWorkers(4);
        o.SetMaxParallelism(16);
    })
    .Logging(l => l.Serilog()));

// Auto-register all handlers from the assembly
builder.Services.AutoRegisterHandlersFromAssemblyOf<PlaceOrderHandler>();

var app = builder.Build();
app.Run();
```

## Message Contracts
```csharp
// Commands
public sealed record PlaceOrder(Guid OrderId, string CustomerId, decimal Total);
public sealed record BillOrder(Guid OrderId, decimal Amount);
public sealed record ShipOrder(Guid OrderId, string Address);

// Events
public sealed record OrderPlaced(Guid OrderId, string CustomerId, decimal Total, DateTime PlacedAt);
public sealed record OrderBilled(Guid OrderId, decimal Amount);
public sealed record OrderShipped(Guid OrderId, string TrackingNumber);
```

## Message Handlers
```csharp
using Rebus.Handlers;

public class PlaceOrderHandler : IHandleMessages<PlaceOrder>
{
    private readonly IOrderRepository _repository;
    private readonly IBus _bus;
    private readonly ILogger<PlaceOrderHandler> _logger;

    public PlaceOrderHandler(IOrderRepository repository, IBus bus,
        ILogger<PlaceOrderHandler> logger)
    {
        _repository = repository;
        _bus = bus;
        _logger = logger;
    }

    public async Task Handle(PlaceOrder message)
    {
        _logger.LogInformation("Processing order {OrderId} for {CustomerId}",
            message.OrderId, message.CustomerId);

        await _repository.CreateAsync(new Order
        {
            Id = message.OrderId,
            CustomerId = message.CustomerId,
            Total = message.Total
        });

        // Publish event to all subscribers
        await _bus.Publish(new OrderPlaced(
            message.OrderId, message.CustomerId, message.Total, DateTime.UtcNow));
    }
}

// Multiple handlers for the same message
public class SendOrderConfirmation : IHandleMessages<OrderPlaced>
{
    private readonly IEmailService _email;

    public SendOrderConfirmation(IEmailService email) => _email = email;

    public async Task Handle(OrderPlaced message)
    {
        await _email.SendAsync(message.CustomerId, "Order Confirmed",
            $"Order {message.OrderId} for {message.Total:C} placed at {message.PlacedAt}.");
    }
}
```

## Sending and Publishing
```csharp
using Rebus.Bus;

// Inject IBus to send and publish messages
app.MapPost("/orders", async (OrderRequest request, IBus bus) =>
{
    var orderId = Guid.NewGuid();

    // Send command (point-to-point, uses routing configuration)
    await bus.Send(new PlaceOrder(orderId, request.CustomerId, request.Total));

    return Results.Accepted($"/orders/{orderId}", new { orderId });
});

// Deferred messages (delay delivery)
app.MapPost("/orders/{id}/remind", async (Guid id, IBus bus) =>
{
    await bus.Defer(TimeSpan.FromHours(24),
        new SendOrderReminder(id));
    return Results.Accepted();
});
```

## Sagas
```csharp
using Rebus.Sagas;
using Rebus.Handlers;

public class OrderSagaData : SagaData
{
    public Guid OrderId { get; set; }
    public bool IsBilled { get; set; }
    public bool IsShipped { get; set; }
}

public class OrderSaga : Saga<OrderSagaData>,
    IAmInitiatedBy<OrderPlaced>,
    IHandleMessages<OrderBilled>,
    IHandleMessages<OrderShipped>
{
    private readonly IBus _bus;

    public OrderSaga(IBus bus) => _bus = bus;

    protected override void CorrelateMessages(ICorrelationConfig<OrderSagaData> config)
    {
        config.Correlate<OrderPlaced>(m => m.OrderId, d => d.OrderId);
        config.Correlate<OrderBilled>(m => m.OrderId, d => d.OrderId);
        config.Correlate<OrderShipped>(m => m.OrderId, d => d.OrderId);
    }

    public async Task Handle(OrderPlaced message)
    {
        Data.OrderId = message.OrderId;
        await _bus.Send(new BillOrder(message.OrderId, message.Total));
    }

    public async Task Handle(OrderBilled message)
    {
        Data.IsBilled = true;
        await CheckCompletion();
    }

    public async Task Handle(OrderShipped message)
    {
        Data.IsShipped = true;
        await CheckCompletion();
    }

    private async Task CheckCompletion()
    {
        if (Data.IsBilled && Data.IsShipped)
        {
            await _bus.Publish(new OrderCompleted(Data.OrderId));
            MarkAsComplete();
        }
    }
}

public sealed record OrderCompleted(Guid OrderId);
public sealed record SendOrderReminder(Guid OrderId);
```

## Saga Persistence Configuration
```csharp
using Rebus.Config;
using Rebus.Persistence.SqlServer;

builder.Services.AddRebus(configure => configure
    .Transport(t => t.UseRabbitMq("amqp://localhost", "order-service"))
    .Sagas(s => s.StoreInSqlServer(
        builder.Configuration.GetConnectionString("Rebus")!,
        "Sagas",       // data table name
        "SagaIndex"))  // index table name
    .Subscriptions(s => s.StoreInSqlServer(
        builder.Configuration.GetConnectionString("Rebus")!,
        "Subscriptions"))
    .Routing(r => r.TypeBased()
        .Map<PlaceOrder>("order-service")));
```

## Error Handling and Second-Level Retries
```csharp
using Rebus.Config;
using Rebus.Retry.Simple;

builder.Services.AddRebus(configure => configure
    .Transport(t => t.UseRabbitMq("amqp://localhost", "order-service"))
    .Options(o =>
    {
        o.RetryStrategy(
            maxDeliveryAttempts: 5,
            secondLevelRetriesEnabled: true,
            errorQueueName: "error");
    }));

// Second-level retry handler (for manual recovery logic)
public class PlaceOrderFailedHandler : IHandleMessages<IFailed<PlaceOrder>>
{
    private readonly IBus _bus;
    private readonly ILogger<PlaceOrderFailedHandler> _logger;

    public PlaceOrderFailedHandler(IBus bus, ILogger<PlaceOrderFailedHandler> logger)
    {
        _bus = bus;
        _logger = logger;
    }

    public async Task Handle(IFailed<PlaceOrder> message)
    {
        _logger.LogWarning("Order {OrderId} failed after retries: {Error}",
            message.Message.OrderId, message.ErrorDescription);

        // Defer for retry after 5 minutes
        await _bus.Advanced.TransportMessage.Defer(TimeSpan.FromMinutes(5));
    }
}
```

## Transport Comparison

| Transport | Package | Use Case |
|-----------|---------|----------|
| RabbitMQ | `Rebus.RabbitMq` | Self-hosted or cloud, high throughput |
| Azure Service Bus | `Rebus.AzureServiceBus` | Azure-native managed messaging |
| Amazon SQS | `Rebus.AmazonSQS` | AWS-native managed messaging |
| SQL Server | `Rebus.SqlServer` | No extra infra, uses existing DB |
| In-Memory | `Rebus.TestHelpers` | Unit tests and development |

## Testing
```csharp
using Rebus.TestHelpers;

[Fact]
public async Task PlaceOrder_should_publish_OrderPlaced()
{
    var fakeBus = new FakeBus();
    var handler = new PlaceOrderHandler(
        new FakeOrderRepository(), fakeBus, NullLogger<PlaceOrderHandler>.Instance);

    await handler.Handle(new PlaceOrder(Guid.NewGuid(), "cust-1", 99m));

    var published = fakeBus.Events.OfType<MessagePublished<OrderPlaced>>().Single();
    Assert.Equal("cust-1", published.EventMessage.CustomerId);
}
```

## Best Practices
- Use `bus.Send()` for commands (routed to a specific endpoint) and `bus.Publish()` for events (fan-out to all subscribers) to maintain clear messaging semantics.
- Configure type-based routing at startup (`TypeBased().Map<T>()`) so command routing is explicit and centralized rather than scattered across sending code.
- Use `AutoRegisterHandlersFromAssemblyOf<T>()` to discover and register all `IHandleMessages<>` implementations automatically from the DI container.
- Enable second-level retries for handlers that may fail persistently; implement `IHandleMessages<IFailed<T>>` to decide whether to defer, dead-letter, or alert.
- Use `bus.Defer()` for delayed message delivery (e.g., reminders, scheduled tasks) rather than implementing custom schedulers.
- Store saga data in SQL Server or another durable store in production; use `FakeBus` and in-memory transport only for testing.
- Correlate saga messages using stable business identifiers (e.g., OrderId) rather than internal infrastructure IDs for reliable message-to-saga matching.
- Call `MarkAsComplete()` in sagas when the workflow ends to release persistence resources and signal that the saga instance can be deleted.
- Set `NumberOfWorkers` and `MaxParallelism` based on workload characteristics; more workers means more concurrent message processing but higher database contention.
- Test handlers with `FakeBus` from `Rebus.TestHelpers` to assert sent commands and published events without needing a real transport or running bus.
