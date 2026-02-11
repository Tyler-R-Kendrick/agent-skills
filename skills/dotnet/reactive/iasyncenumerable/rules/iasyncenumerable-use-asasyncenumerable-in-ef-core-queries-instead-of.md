---
title: "Use `AsAsyncEnumerable()` in EF Core queries instead of `ToListAsync()` for large datasets"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Use `AsAsyncEnumerable()` in EF Core queries instead of `ToListAsync()` for large datasets

Use `AsAsyncEnumerable()` in EF Core queries instead of `ToListAsync()` for large datasets: to stream rows from the database one at a time; note that the `DbContext` must remain alive for the duration of the enumeration.
