---
title: "Use `buffered"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dapper, dotnet, data, high-performance-sql-queries-mapped-to-pocos, read-heavy-and-latency-critical-data-access, stored-procedure-invocation
---

## Use `buffered

Use `buffered: false` in `QueryAsync` for very large result sets that should be streamed row-by-row to avoid loading the entire result into memory at once.
