---
name: hexagonal
description: |
    Hexagonal Architecture (Ports and Adapters), Onion Architecture, and their relationship to Clean Architecture -- enabling technology-independent domain logic with high testability.
    USE FOR: hexagonal architecture, ports and adapters, onion architecture, driving/driven adapters, technology-independent domain design, adapter-based testability
    DO NOT USE FOR: clean architecture layers specifically (use dev/craftsmanship/clean-architecture), microservice boundaries (use microservices), domain model design (use domain-driven-design)
license: MIT
metadata:
  displayName: "Hexagonal Architecture"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Hexagonal Architecture (Ports and Adapters)

## Overview
Hexagonal Architecture, introduced by Alistair Cockburn in 2005, organizes an application so that the core domain logic is isolated from external concerns (databases, APIs, UIs, message brokers) through **ports** (interfaces) and **adapters** (implementations). The goal is to make the application equally drivable by users, programs, automated tests, or batch scripts -- and equally connected to any external system.

The architecture is also known as **Ports and Adapters**. It shares the same fundamental principle as Onion Architecture (Jeffrey Palermo, 2008) and Clean Architecture (Robert C. Martin): **dependencies point inward; the domain depends on nothing external.**

## The Hexagonal Diagram

```
                        Driving Side (Primary)
                     (things that USE the app)

                    REST    CLI    Tests   Events
                     │       │      │       │
                     ▼       ▼      ▼       ▼
               ┌─────────────────────────────────┐
               │        Primary Adapters          │
               │    (implement driving ports)      │
               │                                   │
         ┌─────┤─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤─────┐
         │     │        Primary Ports              │     │
         │     │    (interfaces the app exposes)   │     │
         │     │                                   │     │
         │     │     ┌───────────────────┐         │     │
         │     │     │                   │         │     │
         │     │     │   Domain Model    │         │     │
         │     │     │   (Pure Business  │         │     │
         │     │     │    Logic)         │         │     │
         │     │     │                   │         │     │
         │     │     └───────────────────┘         │     │
         │     │                                   │     │
         │     │       Secondary Ports             │     │
         │     │   (interfaces the app needs)      │     │
         └─────┤─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤─────┘
               │      Secondary Adapters           │
               │   (implement driven ports)        │
               └─────────────────────────────────┘
                     │       │       │       │
                     ▼       ▼       ▼       ▼
                  Postgres  Redis  Stripe  Kafka

                        Driven Side (Secondary)
                    (things the app USES)
```

## Core Concepts

### Ports (Interfaces)

Ports define the boundaries of the application. They are **interfaces** -- contracts that describe what the application can do (primary/driving) or what the application needs (secondary/driven).

| Port Type | Also Called | Direction | Purpose | Example |
|-----------|------------|-----------|---------|---------|
| **Primary Port** | Driving Port | Inbound | Defines what the app **offers** to the outside world | `IOrderService.PlaceOrder(...)` |
| **Secondary Port** | Driven Port | Outbound | Defines what the app **requires** from the outside world | `IOrderRepository.Save(...)`, `IPaymentGateway.Charge(...)` |

```
// Primary port — what the application offers
public interface IOrderService
{
    Task<OrderId> PlaceOrder(PlaceOrderCommand command);
    Task<OrderDto> GetOrder(OrderId id);
    Task CancelOrder(OrderId id);
}

// Secondary port — what the application needs
public interface IOrderRepository
{
    Task<Order?> FindById(OrderId id);
    Task Save(Order order);
}

// Secondary port — what the application needs
public interface IPaymentGateway
{
    Task<PaymentResult> Charge(Money amount, PaymentMethod method);
    Task Refund(PaymentId paymentId, Money amount);
}
```

### Adapters (Implementations)

Adapters are concrete implementations that connect ports to specific technologies. They live **outside** the domain core.

| Adapter Type | Also Called | Implements | Example |
|-------------|------------|------------|---------|
| **Primary Adapter** | Driving Adapter | Uses primary ports | REST controller, gRPC handler, CLI command, test harness |
| **Secondary Adapter** | Driven Adapter | Implements secondary ports | PostgreSQL repository, Stripe payment adapter, Kafka publisher |

```
// Primary adapter — REST controller drives the application
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService; // Primary port

    [HttpPost]
    public async Task<IActionResult> PlaceOrder(PlaceOrderRequest request)
    {
        var command = MapToCommand(request);
        var orderId = await _orderService.PlaceOrder(command);
        return Created($"/orders/{orderId}", new { orderId });
    }
}

// Secondary adapter — PostgreSQL implements the repository port
public class PostgresOrderRepository : IOrderRepository
{
    private readonly DbContext _db;

    public async Task<Order?> FindById(OrderId id)
    {
        return await _db.Orders
            .Include(o => o.Lines)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task Save(Order order) { ... }
}

// Secondary adapter — Stripe implements the payment port
public class StripePaymentGateway : IPaymentGateway
{
    private readonly StripeClient _stripe;

    public async Task<PaymentResult> Charge(Money amount, PaymentMethod method)
    {
        var intent = await _stripe.PaymentIntents.CreateAsync(...);
        return MapToResult(intent);
    }
}
```

### Driving vs. Driven Side

| Aspect | Driving (Primary) Side | Driven (Secondary) Side |
|--------|----------------------|------------------------|
| **Who initiates** | External actor drives the application | Application drives external systems |
| **Port direction** | Inbound (app receives calls) | Outbound (app makes calls) |
| **Adapter role** | Translates external input into domain calls | Translates domain calls into external system interactions |
| **Dependency direction** | Adapter depends on port (calls it) | Adapter implements port (the domain defines the interface) |
| **Examples** | HTTP controller, CLI, test, event consumer | Database, API client, message publisher, file system |

## Code Structure Example

```
src/
  OrderService/
    Domain/                          # Pure domain model (no dependencies)
      Order.cs
      OrderLine.cs
      Money.cs
      OrderStatus.cs

    Ports/
      Primary/                       # What the app offers
        IOrderService.cs
        Commands/
          PlaceOrderCommand.cs
          CancelOrderCommand.cs
        Queries/
          GetOrderQuery.cs
      Secondary/                     # What the app needs
        IOrderRepository.cs
        IPaymentGateway.cs
        IInventoryClient.cs
        IEventPublisher.cs

    Application/                     # Use case orchestration
      OrderApplicationService.cs     # Implements IOrderService

    Adapters/
      Primary/                       # Driving adapters
        Rest/
          OrdersController.cs
        Grpc/
          OrderGrpcService.cs
        Cli/
          OrderCliCommand.cs
      Secondary/                     # Driven adapters
        Persistence/
          PostgresOrderRepository.cs
        Payment/
          StripePaymentGateway.cs
        Messaging/
          KafkaEventPublisher.cs

    Composition/                     # Wires everything together (DI)
      ServiceRegistration.cs
```

## The Dependency Rule

The fundamental rule shared by Hexagonal, Onion, and Clean Architecture:

```
Dependencies point inward. Inner layers know nothing about outer layers.

┌─────────────────────────────────────────┐
│  Adapters (outermost)                    │
│  ┌─────────────────────────────────┐    │
│  │  Ports / Application            │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │  Domain Model           │    │    │
│  │  │  (innermost, no deps)   │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘

  Outer depends on inner. Never the reverse.
```

- The **domain** has zero external dependencies. No framework imports, no database references, no HTTP concepts.
- **Ports** are defined by the domain/application layer using domain language.
- **Adapters** depend on ports (and on external libraries), never the reverse.
- **Composition root** (startup/DI configuration) wires adapters to ports.

## Comparison: Hexagonal vs. Onion vs. Clean Architecture

| Aspect | Hexagonal (Cockburn) | Onion (Palermo) | Clean (Martin) |
|--------|---------------------|-----------------|----------------|
| **Core idea** | Ports and Adapters | Concentric layers | Dependency Rule |
| **Visualization** | Hexagon with ports | Concentric circles | Concentric circles |
| **Inner layer** | Domain Model | Domain Model | Entities |
| **Boundary definition** | Ports (interfaces) | Layer interfaces | Use Case boundaries |
| **Outer layer** | Adapters | Infrastructure | Frameworks & Drivers |
| **Key emphasis** | Symmetry between driving/driven | Layer discipline | Use cases as central organizing concept |
| **Dependency direction** | Inward | Inward | Inward |

**They are the same fundamental idea expressed differently.** All three:
- Isolate the domain from infrastructure.
- Use interfaces (ports) at boundaries.
- Enforce the dependency rule: inner layers never reference outer layers.
- Enable technology swaps without changing business logic.

The practical differences are in emphasis and vocabulary, not in principle.

### Onion Architecture Layers (Palermo)

```
┌─────────────────────────────────────────┐
│  Infrastructure & UI (outermost)         │
│  ┌─────────────────────────────────┐    │
│  │  Application Services           │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │  Domain Services        │    │    │
│  │  │  ┌─────────────────┐    │    │    │
│  │  │  │  Domain Model   │    │    │    │
│  │  │  │  (Entities,     │    │    │    │
│  │  │  │   Value Objects)│    │    │    │
│  │  │  └─────────────────┘    │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Testability: The Primary Benefit

The greatest practical benefit of hexagonal architecture is **testability**. Because the domain depends only on ports (interfaces), you can test business logic without any infrastructure.

```
// Test the domain using mock adapters — no database, no HTTP, no Stripe
[Test]
public async Task PlaceOrder_WithValidItems_ConfirmsOrder()
{
    // Arrange — mock secondary ports
    var orderRepo = new InMemoryOrderRepository();
    var paymentGateway = new FakePaymentGateway(alwaysSucceeds: true);
    var eventPublisher = new SpyEventPublisher();

    // The application service uses ports, not concrete adapters
    var service = new OrderApplicationService(
        orderRepo, paymentGateway, eventPublisher);

    // Act — drive through primary port
    var orderId = await service.PlaceOrder(new PlaceOrderCommand
    {
        CustomerId = "cust-1",
        Items = new[] { new OrderItem("prod-1", 2, 25.00m) }
    });

    // Assert — verify domain behavior
    var order = await orderRepo.FindById(orderId);
    Assert.Equal(OrderStatus.Confirmed, order.Status);
    Assert.Single(eventPublisher.PublishedEvents
        .OfType<OrderConfirmed>());
}
```

### Testing Strategy by Layer

| Layer | Test Type | What to Test | Infrastructure Needed |
|-------|-----------|-------------|----------------------|
| **Domain** | Unit tests | Business rules, invariants, calculations | None (pure logic) |
| **Application** | Unit tests with mocks | Use case orchestration, event publishing | Mock adapters |
| **Primary Adapters** | Integration tests | Request mapping, serialization, routing | HTTP test server |
| **Secondary Adapters** | Integration tests | Database queries, API calls, serialization | Real or containerized infrastructure |
| **Composition** | Smoke / E2E tests | Full system wiring, happy path | Full infrastructure |

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| **Domain imports framework** | Domain coupled to infrastructure; hard to test | Remove all framework dependencies from domain layer |
| **Adapter logic in domain** | Business logic leaks into controllers or repositories | Move logic to domain model or application service |
| **Port too broad** | Interface with 20 methods; hard to mock, violates ISP | Split into focused interfaces (Interface Segregation Principle) |
| **Skipping ports for "simplicity"** | Application calls database directly; loses swappability and testability | Always define a port even if you only have one adapter |
| **Anemic domain + fat service** | Domain model is just data; all logic in application service | Enrich the domain model with behavior (see `dev/architecture/domain-driven-design`) |

## Best Practices
- Keep the domain model completely free of infrastructure dependencies. No ORM attributes, no HTTP concepts, no serialization annotations in the domain layer.
- Define ports using domain language, not technology language. `IOrderRepository.Save(Order)`, not `IDatabaseContext.ExecuteCommand(SQL)`.
- Use dependency injection to wire adapters to ports at the composition root.
- Write the majority of tests against ports (mock adapters), not against infrastructure. This gives you fast, reliable tests.
- Start with one adapter per port. Add additional adapters when you actually need them (e.g., switching databases, adding a CLI interface).
- Use the hexagonal structure to enable incremental migration: swap one adapter at a time without touching the domain.
- Combine with DDD (see `dev/architecture/domain-driven-design`) for rich domain modeling inside the hexagon.
- The hexagonal shape is a metaphor for symmetry -- there is no inherent "top" or "bottom." Any adapter on any side is equally first-class.
