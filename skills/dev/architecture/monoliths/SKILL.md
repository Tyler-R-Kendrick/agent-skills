---
name: monoliths
description: |
    Monolithic architecture patterns including modular monolith design, monolith-first strategy, and migration paths to microservices via the Strangler Fig pattern.
    USE FOR: monolith-first strategy, modular monolith design, monolith decomposition, Strangler Fig migration, avoiding Big Ball of Mud, when to keep a monolith
    DO NOT USE FOR: microservice decomposition (use microservices), event-driven architecture (use event-driven), clean architecture layers (use dev/craftsmanship/clean-architecture)
license: MIT
metadata:
  displayName: "Monoliths"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Martin Fowler — Monolith First"
    url: "https://martinfowler.com/bliki/MonolithFirst.html"
  - title: "Monolithic Application — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Monolithic_application"
---

# Monolithic Architecture

## Overview
A monolith is a single deployable unit containing all application functionality. Despite the industry's enthusiasm for microservices, monoliths remain the right choice for many -- perhaps most -- systems. The key distinction is between a well-structured monolith (modular, maintainable, intentional) and a poorly structured one (Big Ball of Mud).

This skill covers when and how to build a good monolith, how to structure it for maintainability, and how to migrate away from it incrementally when the time comes.

## Canonical Works

| Book | Author(s) | Focus |
|------|-----------|-------|
| *Monolith to Microservices* | Sam Newman | Migration strategies, Strangler Fig, decomposition patterns |
| *Building Microservices* (Ch. 2) | Sam Newman | Monolith-first approach rationale |
| *Fundamentals of Software Architecture* | Richards & Ford | Layered and modular monolith styles |

## Monolith-First Strategy (Martin Fowler)

Martin Fowler's influential guidance: **"Almost all the successful microservice stories have started with a monolith that got too big and was broken up."**

The rationale:
1. **You don't know your domain boundaries yet.** Getting service boundaries wrong in a microservices architecture is very expensive -- you get a distributed monolith. In a monolith, moving code between modules is a refactor, not a distributed systems problem.
2. **Microservices have high operational overhead.** You need CI/CD per service, distributed tracing, service mesh, contract testing. A small team cannot afford this overhead on day one.
3. **Monoliths are faster to develop initially.** In-process calls are simpler, faster, and more reliable than network calls.

**Strategy:** Start with a well-structured modular monolith. Understand your domain. When a specific module needs independent scalability, deployability, or team ownership, extract it as a service.

## Types of Monoliths

### The Big Ball of Mud (Anti-Pattern)
No discernible structure. Any component depends on any other. Changes in one area cause unexpected failures elsewhere. The codebase resists change.

**Symptoms:**
- No clear module boundaries
- Circular dependencies everywhere
- "Touching one thing breaks something else"
- No one understands the full system
- Fear of refactoring
- Extremely long build and test times

### Layered Monolith
Traditional N-tier architecture: Presentation -> Business Logic -> Data Access. Simple and well-understood, but layers are a poor decomposition axis -- a single feature change often cuts across all layers.

```
┌──────────────────────────┐
│   Presentation Layer     │
├──────────────────────────┤
│   Business Logic Layer   │
├──────────────────────────┤
│   Data Access Layer      │
├──────────────────────────┤
│       Database           │
└──────────────────────────┘
```

**Limitations:** Layers encourage technical decomposition instead of domain decomposition. A change to "Order processing" touches all three layers.

### Modular Monolith (Recommended)
A single deployable unit organized into **domain-aligned modules** with well-defined boundaries, explicit internal APIs, and minimal cross-module dependencies. Each module encapsulates its own data, business logic, and (optionally) its own database schema or tables.

```
┌─────────────────────────────────────────────────┐
│                  Monolith Process                 │
│                                                   │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │  Orders   │  │ Inventory │  │ Payments  │    │
│  │           │  │           │  │           │    │
│  │ - Domain  │  │ - Domain  │  │ - Domain  │    │
│  │ - Data    │  │ - Data    │  │ - Data    │    │
│  │ - API     │  │ - API     │  │ - API     │    │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘    │
│        │              │              │            │
│        └──────────────┼──────────────┘            │
│                       │                           │
│              Internal Module APIs                  │
│              (interfaces, not direct access)       │
└─────────────────────────────────────────────────┘
```

## Modular Monolith Design Principles

### 1. Modules as Packages/Assemblies
Each module is a separate package, assembly, or project within the solution. This enables compile-time enforcement of boundaries.

```
src/
  Ordering/
    Ordering.Domain/
    Ordering.Application/
    Ordering.Infrastructure/
    Ordering.Api/          # Internal API (interface)
  Inventory/
    Inventory.Domain/
    Inventory.Application/
    Inventory.Infrastructure/
    Inventory.Api/
  Payments/
    Payments.Domain/
    Payments.Application/
    Payments.Infrastructure/
    Payments.Api/
  Host/                    # Composition root; wires modules together
```

### 2. Internal APIs (Module Contracts)
Modules communicate through **explicitly defined interfaces**, not by reaching into each other's internals. A module exposes a public API (interface + DTOs) and hides everything else.

```
// Inventory module's public API
public interface IInventoryModule
{
    Task<bool> CheckAvailability(string sku, int quantity);
    Task ReserveStock(string sku, int quantity, Guid orderId);
    Task ReleaseReservation(Guid orderId);
}
```

Other modules depend only on this interface. The implementation is internal to the Inventory module.

### 3. Shared Nothing Data
Each module owns its data. Options for enforcement:
- **Separate schemas** -- Each module gets its own database schema (e.g., `ordering.orders`, `inventory.stock`).
- **Separate tables with no cross-module foreign keys** -- Modules reference each other by ID, not by FK.
- **Separate databases** -- Strongest isolation; easiest microservice extraction path.

**Critical rule:** No module reads or writes another module's tables directly. All data access goes through the module's public API.

### 4. Module Communication Patterns
| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Direct method call** | Module A calls Module B's interface | Simple, synchronous operations |
| **In-process events** | Module A publishes an event; Module B subscribes | Decoupled reactions; eventual consistency acceptable |
| **Shared mediator** | Use MediatR or similar for commands/queries/notifications | CQRS-style within the monolith |

### 5. Enforce Boundaries
Use architecture testing tools to prevent boundary violations:
- **ArchUnit** (Java) / **NetArchTest** (.NET) -- Write tests that assert module dependency rules.
- **Dependency analysis** -- Fail the build if a module depends on another module's internals.
- **Access modifiers** -- Use `internal` (C#), package-private (Java), or module visibility to hide implementation.

## The Strangler Fig Pattern

When a monolith needs to be incrementally migrated to microservices, the Strangler Fig pattern (named by Martin Fowler after the strangler fig tree) allows you to **gradually replace** monolith functionality without a risky big-bang rewrite.

```
Phase 1: Route all traffic through a facade
┌──────────┐    ┌──────────┐    ┌──────────────────┐
│  Client   │───▶│  Facade  │───▶│  Monolith        │
└──────────┘    └──────────┘    │  (all features)   │
                                └──────────────────┘

Phase 2: Extract one feature into a new service
┌──────────┐    ┌──────────┐    ┌──────────────────┐
│  Client   │───▶│  Facade  │─┬─▶│  Monolith        │
└──────────┘    └──────────┘ │  │  (minus Orders)   │
                             │  └──────────────────┘
                             │  ┌──────────────────┐
                             └─▶│  Order Service    │
                                └──────────────────┘

Phase 3: Continue extracting until the monolith shrinks or disappears
```

### Strangler Fig Steps
1. **Identify** a module or feature to extract (start with the one that benefits most from independence).
2. **Implement** the new service alongside the monolith.
3. **Redirect** traffic for that feature from monolith to new service (via routing layer, API gateway, or feature flag).
4. **Remove** the old code from the monolith once the new service is proven.
5. **Repeat** for the next feature.

### Migration Anti-Patterns
- **Big Bang rewrite** -- Attempting to rewrite the entire monolith at once. Almost always fails.
- **Extracting services before understanding the domain** -- You will draw wrong boundaries; fix the monolith's module structure first.
- **Shared database during migration** -- Creates invisible coupling between monolith and service. Use data replication or APIs instead.

## When a Monolith Is the RIGHT Choice

A monolith is likely the right architecture when:

- **Small team (< 8-10 developers)** -- Microservice overhead exceeds the benefit.
- **New product / startup / MVP** -- Speed of iteration matters more than scale. You need to learn the domain first.
- **Simple or well-understood domain** -- Not enough complexity to justify distributed systems.
- **Strong consistency requirements** -- ACID transactions within a single database are much simpler than distributed sagas.
- **Limited operational maturity** -- If you don't have CI/CD, monitoring, distributed tracing, and container orchestration, microservices will hurt more than help.
- **Performance-sensitive workloads** -- In-process calls (nanoseconds) vs. network calls (milliseconds). No serialization/deserialization overhead.

**Remember:** A well-structured modular monolith is not a compromise -- it is a deliberate, valid architecture choice.

## Monolith vs. Microservices Tradeoff Summary

| Dimension | Monolith | Microservices |
|-----------|----------|---------------|
| Deployment | Single unit; all-or-nothing | Independent per service |
| Data consistency | Strong (ACID) | Eventual (sagas, compensation) |
| Operational cost | Low (one thing to run) | High (many things to run) |
| Team coupling | Teams share codebase | Teams own services end-to-end |
| Technology flexibility | Single tech stack | Polyglot possible |
| Refactoring cost | Low (IDE refactoring) | High (contract changes, API versioning) |
| Network overhead | None (in-process) | Significant (serialization, latency) |
| Understanding the system | Easier (one codebase) | Harder (distributed tracing needed) |

## Best Practices
- If you choose a monolith, invest in modular structure from day one. A Big Ball of Mud is a choice, not an inevitability.
- Enforce module boundaries with architecture tests (ArchUnit, NetArchTest).
- Keep modules loosely coupled: depend on interfaces, not implementations.
- Make each module independently testable.
- Monitor module complexity (cyclomatic complexity, coupling metrics) as early warnings for when extraction may be needed.
- When migrating, use the Strangler Fig pattern. Never attempt a big-bang rewrite.
- A monolith that is well-structured and maintainable is better than microservices that are poorly understood and operationally fragile.
