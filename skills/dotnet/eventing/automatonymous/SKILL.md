---
name: automatonymous
description: |
  Use when building state machine workflows integrated with MassTransit for distributed sagas and long-running processes.
  USE FOR: state machine definitions, MassTransit saga orchestration, order/workflow lifecycle management, distributed state transitions, compensation logic
  DO NOT USE FOR: simple in-process mediator patterns (use mediatr), standalone actor concurrency (use akka-net), basic event pub/sub without state tracking (use event-driven)
license: MIT
metadata:
  displayName: "Automatonymous"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
---

# Automatonymous

## Overview
Automatonymous is a state machine library for .NET that is now fully integrated into MassTransit (v8+). It enables defining complex workflow state machines declaratively using a fluent API. Each state machine instance tracks its own state, responds to events, executes activities, and supports compensation for distributed saga orchestration. In MassTransit v8+, Automatonymous classes live under the `MassTransit` namespace directly.

## NuGet Packages
- `MassTransit` -- includes Automatonymous state machine support (v8+)
- `MassTransit.EntityFrameworkCore` -- EF Core saga persistence
- `MassTransit.MongoDb` -- MongoDB saga persistence
- `MassTransit.Redis` -- Redis saga persistence

## Saga State Instance
```csharp
using MassTransit;

public class OrderState : SagaStateMachineInstance
{
    public Guid CorrelationId { get; set; }
    public string CurrentState { get; set; } = default!;
    public DateTime OrderDate { get; set; }
    public string CustomerId { get; set; } = default!;
    public decimal Total { get; set; }
    public string? FailureReason { get; set; }
}
```

## Event Contracts
```csharp
public record OrderSubmitted(Guid OrderId, string CustomerId, decimal Total);
public record PaymentProcessed(Guid OrderId, string TransactionId);
public record PaymentFailed(Guid OrderId, string Reason);
public record OrderShipped(Guid OrderId, string TrackingNumber);
public record OrderCancelled(Guid OrderId, string Reason);
```

## Defining a State Machine
```csharp
using MassTransit;

public class OrderStateMachine : MassTransitStateMachine<OrderState>
{
    public OrderStateMachine()
    {
        InstanceState(x => x.CurrentState);

        Event(() => Submitted, x => x.CorrelateById(ctx => ctx.Message.OrderId));
        Event(() => PaymentDone, x => x.CorrelateById(ctx => ctx.Message.OrderId));
        Event(() => PaymentError, x => x.CorrelateById(ctx => ctx.Message.OrderId));
        Event(() => Shipped, x => x.CorrelateById(ctx => ctx.Message.OrderId));
        Event(() => Cancelled, x => x.CorrelateById(ctx => ctx.Message.OrderId));

        Initially(
            When(Submitted)
                .Then(ctx =>
                {
                    ctx.Saga.OrderDate = DateTime.UtcNow;
                    ctx.Saga.CustomerId = ctx.Message.CustomerId;
                    ctx.Saga.Total = ctx.Message.Total;
                })
                .TransitionTo(AwaitingPayment)
                .Publish(ctx => new ProcessPaymentCommand(
                    ctx.Saga.CorrelationId, ctx.Saga.Total)));

        During(AwaitingPayment,
            When(PaymentDone)
                .TransitionTo(Paid),
            When(PaymentError)
                .Then(ctx => ctx.Saga.FailureReason = ctx.Message.Reason)
                .TransitionTo(Failed));

        During(Paid,
            When(Shipped)
                .TransitionTo(Completed)
                .Finalize());

        DuringAny(
            When(Cancelled)
                .Then(ctx => ctx.Saga.FailureReason = ctx.Message.Reason)
                .TransitionTo(Canceled)
                .Finalize());

        SetCompletedWhenFinalized();
    }

    public State AwaitingPayment { get; private set; } = default!;
    public State Paid { get; private set; } = default!;
    public State Completed { get; private set; } = default!;
    public State Failed { get; private set; } = default!;
    public State Canceled { get; private set; } = default!;

    public Event<OrderSubmitted> Submitted { get; private set; } = default!;
    public Event<PaymentProcessed> PaymentDone { get; private set; } = default!;
    public Event<PaymentFailed> PaymentError { get; private set; } = default!;
    public Event<OrderShipped> Shipped { get; private set; } = default!;
    public Event<OrderCancelled> Cancelled { get; private set; } = default!;
}

public record ProcessPaymentCommand(Guid OrderId, decimal Amount);
```

## Registration with MassTransit
```csharp
using MassTransit;
using Microsoft.EntityFrameworkCore;

builder.Services.AddDbContext<OrderSagaDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("Sagas")));

builder.Services.AddMassTransit(cfg =>
{
    cfg.AddSagaStateMachine<OrderStateMachine, OrderState>()
       .EntityFrameworkRepository(r =>
       {
           r.ExistingDbContext<OrderSagaDbContext>();
           r.UseSqlServer();
       });

    cfg.UsingRabbitMq((context, bus) =>
    {
        bus.ConfigureEndpoints(context);
    });
});
```

## EF Core Saga DbContext
```csharp
using MassTransit.EntityFrameworkCoreIntegration;
using Microsoft.EntityFrameworkCore;

public class OrderSagaDbContext : SagaDbContext
{
    public OrderSagaDbContext(DbContextOptions<OrderSagaDbContext> options)
        : base(options) { }

    protected override IEnumerable<ISagaClassMap> Configurations
    {
        get { yield return new OrderStateMap(); }
    }
}

public class OrderStateMap : SagaClassMap<OrderState>
{
    protected override void Configure(EntityTypeBuilder<OrderState> entity, ModelBuilder model)
    {
        entity.Property(x => x.CurrentState).HasMaxLength(64);
        entity.Property(x => x.CustomerId).HasMaxLength(128);
    }
}
```

## Scheduling and Timeouts
```csharp
public class OrderStateMachineWithTimeout : MassTransitStateMachine<OrderState>
{
    public OrderStateMachineWithTimeout()
    {
        InstanceState(x => x.CurrentState);

        Event(() => Submitted, x => x.CorrelateById(ctx => ctx.Message.OrderId));

        Schedule(() => PaymentTimeout, x => x.PaymentTimeoutTokenId,
            s => s.Delay = TimeSpan.FromMinutes(30));

        Initially(
            When(Submitted)
                .Schedule(PaymentTimeout,
                    ctx => new PaymentTimedOut(ctx.Saga.CorrelationId))
                .TransitionTo(AwaitingPayment));

        During(AwaitingPayment,
            When(PaymentTimeout!.Received)
                .TransitionTo(Failed)
                .Finalize());
    }

    public State AwaitingPayment { get; private set; } = default!;
    public State Failed { get; private set; } = default!;
    public Event<OrderSubmitted> Submitted { get; private set; } = default!;
    public Schedule<OrderState, PaymentTimedOut> PaymentTimeout { get; private set; } = default!;
}

public record PaymentTimedOut(Guid OrderId);
```

## State Machine Testing
```csharp
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;

[Fact]
public async Task Order_should_transition_to_paid()
{
    await using var provider = new ServiceCollection()
        .AddMassTransitTestHarness(cfg =>
        {
            cfg.AddSagaStateMachine<OrderStateMachine, OrderState>()
               .InMemoryRepository();
        })
        .BuildServiceProvider(true);

    var harness = provider.GetRequiredService<ITestHarness>();
    await harness.Start();

    var orderId = Guid.NewGuid();
    await harness.Bus.Publish(new OrderSubmitted(orderId, "cust-1", 99.99m));

    var sagaHarness = harness.GetSagaStateMachineHarness<OrderStateMachine, OrderState>();

    Assert.True(await sagaHarness.Consumed.Any<OrderSubmitted>());
    Assert.True(await sagaHarness.Exists(orderId, m => m.AwaitingPayment));

    await harness.Bus.Publish(new PaymentProcessed(orderId, "txn-abc"));
    Assert.True(await sagaHarness.Exists(orderId, m => m.Paid));
}
```

## Persistence Options Comparison

| Store | Package | Use Case |
|-------|---------|----------|
| In-Memory | Built-in | Testing and prototyping |
| Entity Framework Core | `MassTransit.EntityFrameworkCore` | Relational DB persistence with migrations |
| MongoDB | `MassTransit.MongoDb` | Document-oriented saga state |
| Redis | `MassTransit.Redis` | High-throughput, ephemeral sagas |
| Azure Table Storage | `MassTransit.Azure.Table` | Serverless Azure workloads |

## Best Practices
- Define all events with `CorrelateById` or `CorrelateBy` expressions so MassTransit can route messages to the correct saga instance reliably.
- Use `SetCompletedWhenFinalized()` to automatically remove completed saga instances from the persistence store and prevent state table bloat.
- Store saga state in a durable persistence store (EF Core, MongoDB) for production; reserve in-memory repositories for tests only.
- Use `Schedule` for timeout scenarios (e.g., payment not received within 30 minutes) rather than building custom timer logic.
- Keep state machine classes focused on orchestration flow; delegate domain logic to separate services or activities.
- Use `DuringAny` for cross-cutting events like cancellation that should be handled regardless of current state.
- Add `Finalize()` to terminal transitions so the saga instance is properly marked as completed.
- Test state machines using `MassTransitTestHarness` with `InMemoryRepository` to verify transitions without external infrastructure.
- Use `Publish` within transitions for event-driven communication; use `Send` only when targeting a specific endpoint.
- Version your event contracts carefully; add new fields as optional properties to avoid breaking existing saga instances in flight.
