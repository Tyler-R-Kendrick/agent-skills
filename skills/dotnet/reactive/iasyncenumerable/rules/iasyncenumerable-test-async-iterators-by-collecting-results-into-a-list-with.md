---
title: "Test async iterators by collecting results into a list with `await stream.ToListAsync()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Test async iterators by collecting results into a list with `await stream.ToListAsync()`

Test async iterators by collecting results into a list with `await stream.ToListAsync()`: or by asserting on individual items with `await foreach` and a counter, ensuring the stream terminates correctly and cancellation is honored.
