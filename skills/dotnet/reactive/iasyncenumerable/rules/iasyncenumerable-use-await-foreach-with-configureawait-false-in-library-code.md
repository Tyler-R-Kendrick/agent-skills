---
title: "Use `await foreach` with `ConfigureAwait(false)` in library code"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Use `await foreach` with `ConfigureAwait(false)` in library code

Use `await foreach` with `ConfigureAwait(false)` in library code: by writing `await foreach (var item in stream.ConfigureAwait(false))` to avoid capturing the synchronization context on each iteration.
