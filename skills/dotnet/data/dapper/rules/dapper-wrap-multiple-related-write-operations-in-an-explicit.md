---
title: "Wrap multiple related write operations in an explicit..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Wrap multiple related write operations in an explicit...

Wrap multiple related write operations in an explicit `IDbTransaction` and call `Commit` only after all operations succeed to maintain data consistency.
