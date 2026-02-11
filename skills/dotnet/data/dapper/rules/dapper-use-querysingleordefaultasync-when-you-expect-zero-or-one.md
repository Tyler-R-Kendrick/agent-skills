---
title: "Use `QuerySingleOrDefaultAsync` when you expect zero or one..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Use `QuerySingleOrDefaultAsync` when you expect zero or one...

Use `QuerySingleOrDefaultAsync` when you expect zero or one row and `QueryFirstOrDefaultAsync` when you want the first of potentially many rows, to clearly express intent.
