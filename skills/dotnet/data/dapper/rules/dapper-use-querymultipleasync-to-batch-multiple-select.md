---
title: "Use `QueryMultipleAsync` to batch multiple SELECT..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Use `QueryMultipleAsync` to batch multiple SELECT...

Use `QueryMultipleAsync` to batch multiple SELECT statements into a single round trip when a single method needs data from several tables.
