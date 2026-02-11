---
title: "Use `yield return` with `try/finally` for resource cleanup"
impact: MEDIUM
impactDescription: "general best practice"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Use `yield return` with `try/finally` for resource cleanup

Use `yield return` with `try/finally` for resource cleanup: instead of manual iterator state machines, because the compiler generates the correct disposal logic when `await using` or `await foreach` exits (including on cancellation or exception).
