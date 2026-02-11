---
title: "Install the `System.Linq.Async` NuGet package for LINQ operators"
impact: MEDIUM
impactDescription: "general best practice"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Install the `System.Linq.Async` NuGet package for LINQ operators

(`Where`, `Select`, `Take`, `Skip`, `AverageAsync`, `Buffer`) because the BCL does not include LINQ extension methods for `IAsyncEnumerable<T>`.
