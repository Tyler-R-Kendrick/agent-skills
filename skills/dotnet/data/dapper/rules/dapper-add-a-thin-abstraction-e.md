---
title: "Add a thin abstraction (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Add a thin abstraction (e

Add a thin abstraction (e.g., `IDbConnectionFactory`) over connection creation to simplify testing with in-memory databases like SQLite.
