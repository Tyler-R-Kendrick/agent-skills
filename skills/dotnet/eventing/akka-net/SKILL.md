---
name: akka-net
description: |
  Use when building concurrent, distributed, or fault-tolerant .NET applications with the actor model using Akka.NET.
  USE FOR: actor-based concurrency, distributed systems, supervision hierarchies, event sourcing with actors, cluster sharding, CQRS with persistent actors
  DO NOT USE FOR: simple in-process mediator patterns (use mediatr), lightweight message queues (use rebus or masstransit), basic pub/sub without actor semantics (use event-driven)
license: MIT
metadata:
  displayName: "Akka.NET"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "Akka.NET Official Documentation"
    url: "https://getakka.net/"
  - title: "Akka.NET GitHub Repository"
    url: "https://github.com/akkadotnet/akka.net"
  - title: "Akka NuGet Package"
    url: "https://www.nuget.org/packages/Akka"
---

# Akka.NET

## Overview
Akka.NET is a port of the JVM Akka toolkit for building concurrent, distributed, and fault-tolerant applications on .NET using the actor model. Actors are lightweight objects that encapsulate state and behavior, communicate exclusively through asynchronous messages, and are supervised by parent actors. Akka.NET provides clustering, persistence, streams, and remote communication out of the box.

## NuGet Packages
- `Akka` -- core actor system, supervision, and scheduling
- `Akka.Persistence` -- event sourcing and snapshotting for actors
- `Akka.Cluster` -- cluster membership, sharding, and singleton actors
- `Akka.Streams` -- reactive stream processing
- `Akka.Remote` -- transparent actor communication across processes
- `Akka.DependencyInjection` -- Microsoft.Extensions.DependencyInjection integration

## Actor System Setup
```csharp
using Akka.Actor;
using Akka.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddSingleton(sp =>
{
    var bootstrap = BootstrapSetup.Create();
    var diSetup = DependencyResolverSetup.Create(sp);
    var actorSystemSetup = bootstrap.And(diSetup);
    return ActorSystem.Create("OrderSystem", actorSystemSetup);
});

builder.Services.AddHostedService<AkkaHostedService>();
var app = builder.Build();
app.Run();

public class AkkaHostedService : IHostedService
{
    private readonly ActorSystem _actorSystem;

    public AkkaHostedService(ActorSystem actorSystem)
        => _actorSystem = actorSystem;

    public Task StartAsync(CancellationToken ct) => Task.CompletedTask;

    public async Task StopAsync(CancellationToken ct)
        => await CoordinatedShutdown
            .Get(_actorSystem)
            .Run(CoordinatedShutdown.ClrExitReason.Instance);
}
```

## Defining Actors
```csharp
using Akka.Actor;

// Messages (immutable records)
public sealed record PlaceOrder(Guid OrderId, string Product, int Quantity);
public sealed record OrderPlaced(Guid OrderId, DateTime PlacedAt);
public sealed record GetOrderStatus(Guid OrderId);
public sealed record OrderStatus(Guid OrderId, string Status);

// Actor implementation
public class OrderActor : ReceiveActor
{
    private string _status = "New";

    public OrderActor()
    {
        Receive<PlaceOrder>(cmd =>
        {
            _status = "Placed";
            Sender.Tell(new OrderPlaced(cmd.OrderId, DateTime.UtcNow));
            Context.GetLogger().Info("Order {0} placed for {1}", cmd.OrderId, cmd.Product);
        });

        Receive<GetOrderStatus>(query =>
        {
            Sender.Tell(new OrderStatus(query.OrderId, _status));
        });
    }
}

// Creating and messaging actors
var system = ActorSystem.Create("Shop");
var orderActor = system.ActorOf(Props.Create<OrderActor>(), "order-1");

var result = await orderActor.Ask<OrderPlaced>(
    new PlaceOrder(Guid.NewGuid(), "Widget", 5),
    TimeSpan.FromSeconds(5));
```

## Supervision Strategies
```csharp
public class OrderSupervisor : UntypedActor
{
    protected override SupervisorStrategy SupervisorStrategy()
    {
        return new OneForOneStrategy(
            maxNrOfRetries: 3,
            withinTimeRange: TimeSpan.FromMinutes(1),
            localOnlyDecider: ex => ex switch
            {
                ArgumentException => Directive.Resume,
                InvalidOperationException => Directive.Restart,
                _ => Directive.Escalate
            });
    }

    protected override void OnReceive(object message)
    {
        switch (message)
        {
            case PlaceOrder cmd:
                var child = Context.ActorOf(
                    Props.Create<OrderActor>(),
                    $"order-{cmd.OrderId}");
                child.Forward(cmd);
                break;
        }
    }
}
```

## Persistent Actors (Event Sourcing)
```csharp
using Akka.Persistence;

public class PersistentOrderActor : ReceivePersistentActor
{
    public override string PersistenceId => $"order-{_orderId}";
    private readonly Guid _orderId;
    private string _status = "New";
    private readonly List<object> _events = new();

    public PersistentOrderActor(Guid orderId)
    {
        _orderId = orderId;

        Command<PlaceOrder>(cmd =>
        {
            var evt = new OrderPlaced(cmd.OrderId, DateTime.UtcNow);
            Persist(evt, e =>
            {
                Apply(e);
                Sender.Tell(e);
            });
        });

        Recover<OrderPlaced>(evt => Apply(evt));
        Recover<SnapshotOffer>(offer =>
        {
            if (offer.Snapshot is string status)
                _status = status;
        });
    }

    private void Apply(OrderPlaced evt)
    {
        _status = "Placed";
        _events.Add(evt);
        if (_events.Count % 100 == 0)
            SaveSnapshot(_status);
    }
}
```

## Cluster Sharding
```csharp
using Akka.Cluster.Sharding;

var sharding = ClusterSharding.Get(system);

var shardRegion = sharding.Start(
    typeName: "Order",
    entityPropsFactory: entityId =>
        Props.Create(() => new PersistentOrderActor(Guid.Parse(entityId))),
    settings: ClusterShardingSettings.Create(system),
    messageExtractor: new OrderMessageExtractor());

public class OrderMessageExtractor : HashCodeMessageExtractor
{
    public OrderMessageExtractor() : base(maxNumberOfShards: 100) { }

    public override string EntityId(object message) => message switch
    {
        PlaceOrder cmd => cmd.OrderId.ToString(),
        GetOrderStatus q => q.OrderId.ToString(),
        _ => throw new ArgumentException($"Unknown message: {message}")
    };
}

// Send via shard region
shardRegion.Tell(new PlaceOrder(Guid.NewGuid(), "Gadget", 2));
```

## Akka.NET vs Other Frameworks

| Feature | Akka.NET | MassTransit | MediatR |
|---------|----------|-------------|---------|
| Concurrency model | Actor-based | Consumer-based | In-process handler |
| Distribution | Built-in clustering | Via transport | None (in-process) |
| State management | Per-actor state, persistence | Saga state | None |
| Fault tolerance | Supervision hierarchies | Retry policies | None built-in |
| Transport | Akka.Remote, Cluster | RabbitMQ, Azure SB, etc. | N/A |
| Best for | Complex stateful systems | Message-driven integration | Simple CQRS/mediator |

## Best Practices
- Keep messages immutable by using C# `record` types or `sealed class` with `init` properties to prevent accidental mutation during concurrent processing.
- Design small, focused actors with a single responsibility; extract child actors for sub-tasks rather than building monolithic actors.
- Always define an explicit `SupervisorStrategy` in parent actors so failure handling is intentional, not default.
- Use `ReceiveActor` over `UntypedActor` for compile-time type safety on message handling and to avoid manual type-checking casts.
- Prefer `Ask<T>` with a timeout for request-response interactions; use `Tell` for fire-and-forget to avoid unnecessary blocking.
- Use `Akka.Persistence` for actors whose state must survive restarts; snapshot periodically (e.g., every 100 events) to keep recovery fast.
- Avoid blocking calls (`Thread.Sleep`, synchronous I/O) inside actors; use `async`/`await` with `ReceiveAsync` or pipe results with `PipeTo`.
- Use Cluster Sharding for distributing stateful actors across nodes, defining a stable `PersistenceId` scheme for each entity.
- Inject dependencies via `Akka.DependencyInjection` and `Props.Create` factories rather than passing services through messages.
- Test actors using `Akka.TestKit` with `ExpectMsg<T>` assertions to verify message flows without real infrastructure.
