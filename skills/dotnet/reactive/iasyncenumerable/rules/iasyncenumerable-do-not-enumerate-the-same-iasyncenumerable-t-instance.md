---
title: "Do not enumerate the same `IAsyncEnumerable<T>` instance multiple times"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Do not enumerate the same `IAsyncEnumerable<T>` instance multiple times

Do not enumerate the same `IAsyncEnumerable<T>` instance multiple times: because each enumeration restarts the producer; if multiple consumers need the data, materialize it into a list first or use a different abstraction like channels.
