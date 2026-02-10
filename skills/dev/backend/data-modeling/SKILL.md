---
name: data-modeling
description: |
    Use when designing database schemas, choosing data modeling strategies, or making decisions about data storage architecture across relational, document, graph, key-value, and time-series paradigms.
    USE FOR: database schema design, data modeling patterns, normalization/denormalization, document modeling, graph modeling, key-value design, time-series modeling, schema migration strategies, database-per-service decisions
    DO NOT USE FOR: ERD diagramming (use specs/diagramming/erd), API design (use api-design), caching strategy (use caching)
license: MIT
metadata:
  displayName: "Data Modeling & Database Architecture"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Data Modeling & Database Architecture

## Overview
Data modeling is the process of defining how data is stored, connected, and accessed. The right model depends on the access patterns, consistency requirements, and scale characteristics of each bounded context. This skill covers modeling techniques across all major database paradigms, drawn from Martin Kleppmann's *Designing Data-Intensive Applications* (Chapters 2-3) and industry-proven schema design patterns.

## Relational Modeling

### Normalization (1NF through 3NF)

Normalization eliminates data redundancy and update anomalies by organizing data into well-structured tables.

| Normal Form | Rule | Example Violation |
|-------------|------|-------------------|
| **1NF** | Atomic values only; no repeating groups | A `phones` column containing comma-separated numbers |
| **2NF** | 1NF + no partial dependencies on composite keys | `order_items(order_id, product_id, product_name)` -- `product_name` depends only on `product_id` |
| **3NF** | 2NF + no transitive dependencies | `employees(id, dept_id, dept_name)` -- `dept_name` depends on `dept_id`, not `id` |

**Process:** Start normalized (3NF). This gives you the cleanest write path and prevents update anomalies.

### Denormalization for Read Performance

When read-heavy workloads suffer from excessive joins, selectively denormalize:

```sql
-- Normalized: requires JOIN on every read
SELECT o.id, c.name, c.email
FROM orders o JOIN customers c ON o.customer_id = c.id;

-- Denormalized: customer_name stored directly on orders
SELECT id, customer_name, customer_email FROM orders;
```

**Trade-off:** Faster reads, but writes must update data in multiple places. Use denormalization when:
- Read frequency vastly exceeds write frequency for the denormalized data.
- Join complexity is measurably hurting query performance.
- You accept the cost of maintaining consistency across copies.

For visual schema documentation, cross-reference **specs/diagramming/erd**.

## Document Modeling (MongoDB-Style)

### Embedding vs. Referencing

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Embed** | Data is read together, 1:1 or 1:few relationship, child is owned by parent | `{ order: { items: [...] } }` |
| **Reference** | Data is read independently, 1:many or many:many, child is shared | `{ order: { item_ids: [...] } }` |

**Rule of thumb:** Embed what you read together. Reference what you update independently.

### Document Schema Design Patterns

| Pattern | Problem It Solves | Technique |
|---------|-------------------|-----------|
| **Subset** | Documents too large; only part is needed per query | Store frequently accessed fields in main doc; archive rest in separate collection |
| **Computed** | Expensive aggregation on every read | Pre-compute and store derived values; update on write or via background job |
| **Extended Reference** | Frequent joins to get a few fields from related docs | Copy the most-accessed fields from the referenced document into the referencing one |
| **Bucket** | Too many small documents (e.g., IoT readings) | Group related data into time-bucketed documents (e.g., one doc per hour of readings) |
| **Outlier** | A few documents have vastly more sub-items than typical | Flag outlier docs and overflow extra data into separate documents |

```javascript
// Bucket pattern example -- sensor readings grouped by hour
{
  sensor_id: "temp-42",
  bucket_start: ISODate("2024-01-15T14:00:00Z"),
  readings: [
    { ts: ISODate("2024-01-15T14:00:12Z"), value: 22.5 },
    { ts: ISODate("2024-01-15T14:01:45Z"), value: 22.7 },
    // ... up to ~200 readings per bucket
  ],
  count: 2
}
```

## Graph Modeling (Neo4j-Style)

Graph databases model data as **nodes** (entities), **relationships** (edges with direction and type), and **properties** (key-value pairs on both).

### Core Concepts

```
(:Person {name: "Alice"})
   -[:WORKS_AT {since: 2020}]->
(:Company {name: "Acme"})
   -[:LOCATED_IN]->
(:City {name: "Seattle"})
```

- **Nodes** represent entities (labeled for type).
- **Relationships** have a type, direction, and optional properties.
- **Properties** are key-value pairs on nodes or relationships.

### Cypher Basics

```cypher
// Find friends of friends who work at the same company
MATCH (me:Person {name: "Alice"})-[:FRIEND]->(friend)-[:FRIEND]->(fof),
      (me)-[:WORKS_AT]->(company)<-[:WORKS_AT]-(fof)
WHERE me <> fof
RETURN fof.name, company.name
```

### When to Use Graph Modeling
- Social networks (friends, followers, connections)
- Recommendation engines (users who bought X also bought Y)
- Fraud detection (detecting rings of related accounts)
- Knowledge graphs and ontologies
- Network/infrastructure mapping

## Key-Value and Wide-Column

### Redis Data Structures

| Structure | Use Case | Example |
|-----------|----------|---------|
| **String** | Cache, counters, simple values | `SET user:42:name "Alice"` |
| **Hash** | Object storage, partial updates | `HSET user:42 name "Alice" email "a@b.com"` |
| **List** | Queues, activity feeds, recent items | `LPUSH notifications:42 "New message"` |
| **Set** | Tags, unique collections, intersections | `SADD user:42:skills "go" "rust"` |
| **Sorted Set** | Leaderboards, ranked feeds, priority queues | `ZADD leaderboard 9500 "player:7"` |
| **Stream** | Event log, message queue | `XADD events * type "order" id "123"` |

### DynamoDB Single-Table Design

Single-table design places multiple entity types in one table using carefully designed partition keys (PK) and sort keys (SK):

```
PK                  SK                    Data
USER#alice          PROFILE               { name, email, ... }
USER#alice          ORDER#2024-001        { total, status, ... }
USER#alice          ORDER#2024-002        { total, status, ... }
ORG#acme            METADATA              { plan, created, ... }
ORG#acme            MEMBER#alice          { role, joined, ... }
```

**Advantages:** Eliminates joins; supports multiple access patterns via GSIs.
**Trade-off:** Complex to design; requires knowing access patterns upfront.

### Cassandra Partition Keys

- **Partition key** determines which node stores the data -- must distribute evenly.
- **Clustering columns** determine sort order within a partition.
- Design tables around queries, not entities. One table per query pattern is common.

```cql
CREATE TABLE sensor_readings (
    sensor_id TEXT,
    reading_date DATE,
    reading_time TIMESTAMP,
    value DOUBLE,
    PRIMARY KEY ((sensor_id, reading_date), reading_time)
) WITH CLUSTERING ORDER BY (reading_time DESC);
```

## Time-Series Data

### InfluxDB / TimescaleDB Concepts

| Concept | InfluxDB Term | TimescaleDB Term | Purpose |
|---------|--------------|------------------|---------|
| **Identifier** | Measurement | Hypertable | Logical table / collection |
| **Indexed metadata** | Tags | Indexed columns | Fast filtering (e.g., `sensor_id`, `region`) |
| **Measured values** | Fields | Data columns | The actual readings (e.g., `temperature`, `cpu_pct`) |
| **Time** | Timestamp | Time column | Required; basis for partitioning and queries |

### Retention Policies & Downsampling

```
Raw data (1-second granularity) → keep 7 days
Downsampled to 1-minute averages → keep 90 days
Downsampled to 1-hour averages  → keep 2 years
```

Design retention policies early: time-series data grows fast. Continuous queries or materialized views automate downsampling.

## Microservices Data Architecture

### Database per Service vs. Shared Database

| Approach | Pros | Cons |
|----------|------|------|
| **Database per service** | Independent deployment, technology freedom, fault isolation | Cross-service queries require APIs; distributed transactions are hard |
| **Shared database** | Easy joins, familiar tooling, simple transactions | Tight coupling, schema changes require coordination, single point of failure |

**Recommendation:** Default to database-per-service for microservices. Use the Saga pattern or event-driven architecture for cross-service consistency. Reserve shared databases for small teams or closely related services where the coordination cost of separation outweighs the coupling cost.

## Schema Migration Strategies

### Forward-Only Migrations

Every migration moves the schema forward. Rollback is achieved by deploying a new forward migration that reverses the change. Simplest approach; works well for most teams.

### Expand-Contract (Parallel Change)

For zero-downtime deployments when changing column types, renaming fields, or splitting tables:

```
Phase 1 — EXPAND
  Add new column (keep old column)
  Deploy code that writes to BOTH columns
  Backfill new column from old column

Phase 2 — MIGRATE
  Deploy code that reads from new column
  Verify all consumers use new column

Phase 3 — CONTRACT
  Deploy code that stops writing to old column
  Drop old column
```

This pattern prevents breaking changes during rolling deployments where old and new code versions run simultaneously.

## Canonical Reference
- *Designing Data-Intensive Applications* by Martin Kleppmann, Chapters 2-3 -- data models, query languages, storage engines, and the trade-offs between relational, document, and graph models.

## Best Practices
- Model around access patterns, not just entity relationships. The best schema depends on how you query, not just what you store.
- Start normalized (3NF) for relational databases; denormalize only when you have measured evidence of read-path bottlenecks.
- In document databases, embed what you read together and reference what you update independently.
- For DynamoDB and Cassandra, know your access patterns before designing the table schema -- retrofitting is painful.
- Use expand-contract migrations for any schema change in a system that requires zero-downtime deployments.
- Time-series data needs retention policies from day one. Without them, storage costs grow unbounded.
- In microservices, prefer database-per-service for independence, and accept the complexity of cross-service data coordination.
