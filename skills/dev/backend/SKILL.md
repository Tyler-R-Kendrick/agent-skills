---
name: backend
description: |
    Use when making backend architecture decisions — choosing API styles, database types, caching strategies, authentication mechanisms, and server-side design patterns for scalable, maintainable systems.
    USE FOR: backend architecture decisions, choosing API styles, choosing database types, server-side design patterns, backend system design
    DO NOT USE FOR: specific pattern details (use sub-skills: data-modeling, api-design, caching, authentication), frontend architecture (use dev/frontend), infrastructure (use iac)
license: MIT
metadata:
  displayName: "Backend Architecture"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Backend Architecture

## Overview
Backend architecture encompasses the server-side decisions that determine how a system stores data, exposes functionality, handles security, and scales under load. The choices made at this level -- API style, database type, caching strategy, authentication mechanism -- ripple through every layer of the application and are difficult to change once established.

This skill provides a decision-making framework drawn from Martin Kleppmann's *Designing Data-Intensive Applications* and industry-proven patterns for building reliable, scalable, and maintainable backend systems.

## Knowledge Map

```
┌─────────────────────────────────────────────────────────────────┐
│  API Layer                                                       │
│  REST, GraphQL, gRPC, WebSocket                                 │
│  → How clients communicate with the backend                     │
├─────────────────────────────────────────────────────────────────┤
│  Data Storage                     │  Caching                    │
│  Relational, Document, Graph,     │  In-memory, Distributed,   │
│  Key-Value, Time-Series           │  CDN, HTTP caching          │
│  → How data is persisted          │  → How hot data is served   │
├─────────────────────────────────────────────────────────────────┤
│  Authentication & Authorization   │  Background Processing      │
│  OAuth 2.0, JWT, RBAC, ABAC,     │  Job queues, schedulers,   │
│  Multi-tenancy                    │  event-driven workers       │
├─────────────────────────────────────────────────────────────────┤
│  Rate Limiting & Throttling       │  Observability              │
│  Token bucket, sliding window,    │  Logging, metrics, tracing, │
│  API quotas, circuit breakers     │  health checks, alerting    │
└─────────────────────────────────────────────────────────────────┘
```

## Choosing an API Style

| Criterion | REST | GraphQL | gRPC | WebSocket |
|-----------|------|---------|------|-----------|
| **Best for** | CRUD resources, public APIs | Flexible queries, mobile clients | Internal microservices, high throughput | Real-time bidirectional communication |
| **Data format** | JSON (typically) | JSON | Protobuf (binary) | Any (JSON, binary) |
| **Contract** | OpenAPI / Swagger | Schema (SDL) | .proto files | No standard schema |
| **Caching** | HTTP caching (excellent) | Harder (POST-based) | No HTTP caching | Not cacheable |
| **Streaming** | SSE (server-only) | Subscriptions | Bidirectional streaming | Full-duplex native |
| **Browser support** | Native | Native | Requires gRPC-Web proxy | Native |
| **Learning curve** | Low | Medium | Medium-High | Low-Medium |
| **Over/under-fetching** | Common problem | Solved by design | Defined per RPC | N/A |
| **Tooling maturity** | Excellent | Good | Good (growing) | Moderate |

**Decision heuristic:**
- Default to **REST** for public APIs and simple CRUD services.
- Choose **GraphQL** when clients need flexible, aggregated queries across multiple resources (especially mobile).
- Choose **gRPC** for internal service-to-service communication where latency and throughput matter.
- Choose **WebSocket** when you need real-time, bidirectional data flow (chat, live dashboards, collaborative editing).
- Many systems combine styles: REST for public API, gRPC internally, WebSocket for real-time features.

## Choosing a Database Type

| Criterion | Relational (SQL) | Document (NoSQL) | Graph | Key-Value | Time-Series |
|-----------|------------------|-------------------|-------|-----------|-------------|
| **Best for** | Structured data, complex joins, ACID transactions | Flexible schemas, nested data, rapid iteration | Highly connected data, relationship traversal | Simple lookups, caching, session storage | Metrics, IoT, logs, financial ticks |
| **Examples** | PostgreSQL, MySQL, SQL Server | MongoDB, CouchDB, DynamoDB | Neo4j, Amazon Neptune, ArangoDB | Redis, Memcached, DynamoDB | InfluxDB, TimescaleDB, Prometheus |
| **Schema** | Strict (schema-on-write) | Flexible (schema-on-read) | Property graph / RDF | Schema-free | Tag + field model |
| **Scaling** | Vertical (horizontal with sharding) | Horizontal (built-in) | Vertical (some horizontal) | Horizontal (built-in) | Horizontal (built-in) |
| **Transactions** | Full ACID | Limited (document-level) | Varies by product | None (typically) | None (typically) |
| **Query language** | SQL | Vendor-specific (MQL, etc.) | Cypher, Gremlin, SPARQL | GET/SET commands | InfluxQL, Flux, SQL |
| **Joins** | Excellent | Poor (application-level) | Excellent (traversals) | None | Limited |

**Decision heuristic:**
- Default to **relational** (PostgreSQL) when data is structured and relationships matter.
- Choose **document** when schema flexibility and developer velocity are priorities, and joins are rare.
- Choose **graph** when the primary queries traverse relationships (social networks, recommendations, fraud detection).
- Choose **key-value** for caching, sessions, and simple lookup-by-key workloads.
- Choose **time-series** for append-heavy, time-stamped data with downsampling and retention needs.
- Polyglot persistence is common: use the right database for each bounded context.

## Backend Architecture Concerns

### Rate Limiting & Throttling
Protect backend services from abuse and overload:
- **Token Bucket** -- allows bursts up to a configured capacity, refills at a steady rate.
- **Sliding Window** -- counts requests in a rolling time window for smoother limiting.
- **Fixed Window** -- simple counter per time window (risk of burst at window boundaries).
- **Leaky Bucket** -- processes requests at a constant rate, queuing excess.
- Implement at the API gateway layer for consistency across services.

### Background Processing
Offload long-running or non-urgent work from the request/response cycle:
- **Job queues** (Sidekiq, Celery, Hangfire, BullMQ) -- enqueue work, process asynchronously.
- **Scheduled jobs** (cron, Quartz, Hangfire recurring) -- time-triggered processing.
- **Event-driven workers** -- react to domain events from a message broker.
- **Batch processing** -- periodic bulk operations (ETL, report generation).
- Always design for idempotency -- workers may process the same job more than once.

### Observability
The three pillars of observability, plus health monitoring:
- **Logging** -- structured logs (JSON) with correlation IDs for request tracing.
- **Metrics** -- counters, gauges, histograms (request rate, error rate, latency percentiles).
- **Distributed Tracing** -- end-to-end trace across services (OpenTelemetry, Jaeger, Zipkin).
- **Health checks** -- liveness (is the process running?) and readiness (can it serve traffic?).
- **Alerting** -- thresholds on key metrics (error rate > 1%, p99 latency > 500ms).

## Canonical Reference
- *Designing Data-Intensive Applications* by Martin Kleppmann -- the definitive guide to data storage, replication, partitioning, encoding, and distributed system trade-offs. Essential reading for any backend architect.

## Sub-Skills
- `dev/backend/data-modeling` -- Data modeling and database architecture patterns
- `dev/backend/api-design` -- API design patterns for REST, GraphQL, gRPC, WebSocket
- `dev/backend/caching` -- Caching strategies and patterns
- `dev/backend/authentication` -- Authentication and authorization patterns

## Best Practices
- Start with a monolith and extract services only when complexity demands it -- premature microservices add coordination cost without proportional benefit.
- Choose boring technology by default. PostgreSQL, Redis, and a well-designed REST API solve the vast majority of backend problems.
- Design for failure: every network call can fail, every database can be slow. Use timeouts, retries with backoff, circuit breakers, and fallbacks.
- Make operations idempotent wherever possible -- especially for writes, background jobs, and event handlers.
- Instrument everything from day one. Adding observability retroactively is far more expensive than building it in.
- Treat API contracts as public commitments: version explicitly, deprecate gracefully, never break existing clients without a migration path.
