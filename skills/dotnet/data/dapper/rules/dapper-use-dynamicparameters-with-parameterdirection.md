---
title: "Use `DynamicParameters` with `ParameterDirection"
impact: MEDIUM
impactDescription: "general best practice"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Use `DynamicParameters` with `ParameterDirection

Use `DynamicParameters` with `ParameterDirection.Output` for stored procedures that return values through output parameters rather than result sets.
