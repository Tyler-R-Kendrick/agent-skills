---
title: "Use `AsNoTracking()` on all read-only queries to avoid the..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: entity-framework-core, dotnet, data, crud-data-access-with-linq, database-migrations, change-tracking
---

## Use `AsNoTracking()` on all read-only queries to avoid the...

Use `AsNoTracking()` on all read-only queries to avoid the overhead of change tracking and reduce memory consumption in read-heavy scenarios.
