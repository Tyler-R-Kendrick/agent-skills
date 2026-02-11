# Event-Driven Architecture, Event Sourcing & CQRS

## Overview
This skill covers three complementary but independent patterns that are frequently used together:

1. **Event-Driven Architecture (EDA)** -- A system design where components communicate through events rather than direct calls.
2. **Event Sourcing** -- A persistence pattern where state is stored as a sequence of events rather than as current state.
3. **CQRS (Command Query Responsibility Segregation)** -- A pattern that separates read and write models.

These patterns can be used independently or combined. Understanding when to use each -- and when to combine them -- is critical.

## Canonical Works

| Book | Author(s) | Relevant Coverage |
|------|-----------|-------------------|
| *Designing Data-Intensive Applications* | Martin Kleppmann | Event sourcing, stream processing, change data capture |
| *Implementing Domain-Driven Design* | Vaughn Vernon | Domain events, event sourcing with DDD, CQRS |
| *Building Event-Driven Microservices* | Adam Bellemare | EDA at scale, event mesh, stream processing |
| *Enterprise Integration Patterns* | Hohpe & Woolf | Messaging foundations (see `dev/integration-patterns`) |

## Relationship Between the Three Patterns

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  Event-Driven Architecture (EDA)                          │
│  Components communicate through events                    │
│                                                           │
│    ┌──────────────────┐    ┌──────────────────┐          │
│    │  Event Sourcing   │    │      CQRS        │          │
│    │  Store state as   │    │  Separate read    │          │
│    │  event log        │    │  and write models │          │
│    └────────┬─────────┘    └────────┬─────────┘          │
│             │                       │                     │
│             └───────────┬───────────┘                     │
│                         │                                 │
│              Can be combined but                           │
│              are independent patterns                     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

- **EDA without Event Sourcing:** Services publish events but store current state in a traditional database.
- **Event Sourcing without CQRS:** Store state as events and rebuild current state from the event log -- but use the same model for reads and writes.
- **CQRS without Event Sourcing:** Separate read and write models backed by a traditional database.
- **All three combined:** The most powerful but most complex combination.

## Event-Driven Architecture (EDA)

In EDA, components produce and consume events. An event represents something that happened -- a fact. Events are immutable and past-tense (OrderPlaced, PaymentReceived, InventoryReserved).

### Event Types

| Type | Description | Example |
|------|-------------|---------|
| **Event Notification** | A thin signal that something happened; consumer fetches details if needed | `{ "type": "OrderPlaced", "orderId": "123" }` |
| **Event-Carried State Transfer** | Event carries the full state needed by consumers | `{ "type": "OrderPlaced", "orderId": "123", "items": [...], "total": 99.95 }` |
| **Domain Event** | A significant occurrence in the domain model (DDD) | `OrderPlaced`, `PaymentFailed`, `ShipmentDispatched` |

### EDA Topology

**Broker topology** (most common): Events flow through a central broker (Kafka, RabbitMQ, AWS EventBridge, Azure Service Bus).

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐
│ Producer  │───▶│  Event       │───▶│  Consumer A  │
│           │    │  Broker      │───▶│  Consumer B  │
│           │    │  (Kafka,     │───▶│  Consumer C  │
└──────────┘    │  RabbitMQ)   │    └──────────────┘
                └──────────────┘
```

**Mediator topology**: A central mediator orchestrates event flow (used when processing order matters).

### EDA Benefits and Tradeoffs

| Benefit | Tradeoff |
|---------|----------|
| Loose coupling between producers and consumers | Harder to trace and debug end-to-end flows |
| Independent scalability per component | Eventual consistency; no immediate confirmation |
| Temporal decoupling (producer doesn't wait) | Event ordering and deduplication challenges |
| Natural fit for audit trails | Schema evolution and versioning complexity |
| Easy to add new consumers without changing producers | Error handling is more complex (dead letters, retries) |

## Event Sourcing

Instead of storing the current state of an entity, store the **sequence of events** that led to the current state. The current state is derived by replaying the events.

### Traditional State vs. Event Sourcing

```
Traditional (State-based):
┌─────────────────────┐
│  Account             │
│  balance: $750       │  ← Only current state; history lost
│  status: active      │
└─────────────────────┘

Event Sourcing (Event Log):
┌─────────────────────────────────────────────────────┐
│  Event Store (Account #42)                           │
│                                                       │
│  1. AccountOpened    { balance: $0 }        2024-01  │
│  2. MoneyDeposited   { amount: $1000 }      2024-01  │
│  3. MoneyWithdrawn   { amount: $200 }       2024-02  │
│  4. MoneyWithdrawn   { amount: $50 }        2024-03  │
│                                                       │
│  Current state: replay events → balance: $750         │
└─────────────────────────────────────────────────────┘
```

### Event Store Structure

An event store is an append-only log organized by stream (typically one stream per aggregate):

| Column | Type | Description |
|--------|------|-------------|
| `stream_id` | string | Aggregate/entity identifier (e.g., `account-42`) |
| `event_id` | UUID | Unique event identifier |
| `event_type` | string | Event name (e.g., `MoneyDeposited`) |
| `data` | JSON/binary | Event payload |
| `metadata` | JSON | Correlation ID, causation ID, user, timestamp |
| `version` | integer | Sequence number within the stream (for optimistic concurrency) |
| `timestamp` | datetime | When the event was appended |

```sql
CREATE TABLE event_store (
    stream_id    VARCHAR(255) NOT NULL,
    version      INTEGER NOT NULL,
    event_id     UUID NOT NULL,
    event_type   VARCHAR(255) NOT NULL,
    data         JSONB NOT NULL,
    metadata     JSONB,
    timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (stream_id, version)
);
```

### Event Store Implementations

| Technology | Type | Notes |
|-----------|------|-------|
| **EventStoreDB** | Purpose-built | Native event sourcing database; subscriptions, projections |
| **Marten** | .NET library | Event sourcing + document DB on top of PostgreSQL |
| **Axon Framework** | Java framework | Event sourcing + CQRS + saga support |
| **PostgreSQL + custom table** | DIY | Simple; use the schema above |
| **Apache Kafka** | Log-based | Can serve as event store; infinite retention + compaction |
| **DynamoDB + streams** | AWS | Single-table design with event streams |

### Event Sourcing Benefits

- **Complete audit trail** -- Every change is recorded as an immutable event.
- **Temporal queries** -- "What was the account balance on March 15?" Replay events up to that date.
- **Event replay** -- Rebuild read models, fix projections, or populate new services by replaying events.
- **Debugging** -- Reproduce any state by replaying the event sequence.
- **Domain richness** -- Events capture business intent, not just data changes.

### Event Sourcing Challenges

- **Event schema evolution** -- Events are immutable, but their schema must evolve. Use upcasting or versioned deserializers.
- **Replay performance** -- Long event streams are slow to replay. Use **snapshots** to checkpoint state periodically.
- **Eventual consistency** -- Read models (projections) are updated asynchronously; they may lag behind the write model.
- **Complexity** -- Significantly more complex than CRUD for simple domains.
- **Storage growth** -- Event stores grow continuously. Archiving and retention policies are needed.

## CQRS (Command Query Responsibility Segregation)

CQRS separates the model used for updating (commands/writes) from the model used for reading (queries/reads). This allows each side to be optimized independently.

### CQRS Architecture

```
                    ┌──────────────────┐
                    │    Client        │
                    └────┬────────┬────┘
                         │        │
                   Commands    Queries
                         │        │
                    ┌────▼──┐  ┌──▼──────┐
                    │ Write │  │  Read    │
                    │ Model │  │  Model   │
                    │       │  │          │
                    │Command│  │ Query    │
                    │Handler│  │ Handler  │
                    └───┬───┘  └────▲────┘
                        │           │
                   ┌────▼───┐  ┌────┴────┐
                   │ Write  │  │  Read   │
                   │ Store  │──▶│  Store  │
                   │        │  │(Projec- │
                   └────────┘  │ tions)  │
                               └─────────┘
```

### Why Separate Read and Write Models?

| Concern | Write Model | Read Model |
|---------|-------------|------------|
| **Optimization** | Normalized; optimized for consistency | Denormalized; optimized for query performance |
| **Scaling** | Scale for write throughput | Scale for read throughput (often 10-100x more reads) |
| **Schema** | Domain model (aggregates, entities) | Flat, query-specific views (projections) |
| **Validation** | Complex business rules, invariants | No business rules; just serving data |
| **Storage** | Event store, relational DB | Document DB, search index, cache, materialized views |

### Projections (Read Models)

Projections transform events into query-optimized read models. They subscribe to the event stream and update materialized views.

```
Event Stream:
  OrderPlaced { orderId: 1, customer: "Alice", total: $50 }
  OrderShipped { orderId: 1, trackingNumber: "XYZ123" }

Projection → Order Summary (Read Model):
  { orderId: 1, customer: "Alice", total: $50,
    status: "Shipped", tracking: "XYZ123" }
```

Multiple projections can be built from the same event stream for different query needs:
- **Order summary** -- For the customer dashboard
- **Revenue report** -- For the finance team
- **Shipping manifest** -- For the warehouse

## Eventual Consistency

When using EDA, event sourcing, or CQRS, the system is eventually consistent -- updates propagate asynchronously and read models may temporarily be stale.

### Managing Eventual Consistency

| Strategy | Description |
|----------|-------------|
| **Causal consistency** | Ensure events are processed in causal order (use stream position / version) |
| **Read-your-own-writes** | After a command, query the write model directly (bypass read model) or wait for projection to catch up |
| **UI optimistic update** | Update the UI immediately; reconcile when the read model catches up |
| **Polling / subscription** | Client subscribes to updates or polls until the read model reflects the change |
| **Version stamping** | Include a version in responses; client retries if version is stale |

## Compensating Transactions

In eventually consistent systems, you cannot roll back distributed changes with a traditional transaction. Instead, use **compensating transactions** -- actions that semantically undo the effect of a previous action.

```
Forward:   OrderPlaced → PaymentCharged → InventoryReserved → ShipmentCreated
Compensate: OrderCancelled ← PaymentRefunded ← InventoryReleased ← ShipmentCancelled
```

Compensating transactions are used in the saga pattern (see `dev/architecture/microservices` for choreography vs. orchestration).

## When to Use Each Pattern

| Pattern | Use When | Avoid When |
|---------|----------|------------|
| **EDA** | Multiple consumers need to react to changes; temporal decoupling needed; high scalability | Simple CRUD apps; strong consistency required; small systems with few components |
| **Event Sourcing** | Audit trail is critical; temporal queries needed; domain is event-centric; complex business rules | Simple CRUD domains; team unfamiliar with the pattern; high-volume writes with no audit need |
| **CQRS** | Read and write patterns differ significantly; need independent scaling; complex query requirements | Simple domains where reads and writes are symmetric; small systems; team unfamiliar with the pattern |
| **All three** | Complex domains with audit requirements, different read/write scaling needs, and reactive workflows | MVP or prototype; small team; simple domain; when any individual pattern would suffice |

## Best Practices
- Start with EDA alone if you only need loose coupling and reactive behavior. Add event sourcing or CQRS only when you have a specific need.
- Design events as first-class domain concepts: past-tense, immutable, carrying business intent (not CRUD operations).
- Plan for event schema evolution from day one. Use a schema registry (Avro, Protobuf) for strong contracts.
- Build projections to be rebuildable: if a projection is corrupted or needs to change, replay events from the beginning.
- Use snapshots for long-lived event streams to keep replay times reasonable.
- Handle idempotency in all event consumers: at-least-once delivery is the norm.
- Monitor projection lag (time between event publication and read model update) as a key operational metric.
- Keep the write model focused on enforcing business invariants; keep the read model focused on query performance.
