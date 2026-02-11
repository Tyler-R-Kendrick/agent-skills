---
title: "Always use parameterized queries with anonymous objects (e"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Always use parameterized queries with anonymous objects (e

Always use parameterized queries with anonymous objects (e.g., `new { Id = id }`) instead of string interpolation to prevent SQL injection and enable query plan caching.
