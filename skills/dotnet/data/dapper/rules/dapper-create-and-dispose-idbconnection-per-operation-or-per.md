---
title: "Create and dispose `IDbConnection` per operation or per..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Create and dispose `IDbConnection` per operation or per...

Create and dispose `IDbConnection` per operation or per request; do not share a single connection across concurrent operations or store it in a singleton.
