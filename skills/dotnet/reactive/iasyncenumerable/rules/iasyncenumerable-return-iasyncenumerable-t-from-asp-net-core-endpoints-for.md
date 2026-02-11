---
title: "Return `IAsyncEnumerable<T>` from ASP.NET Core endpoints for large result sets"
impact: MEDIUM
impactDescription: "general best practice"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Return `IAsyncEnumerable<T>` from ASP.NET Core endpoints for large result sets

Return `IAsyncEnumerable<T>` from ASP.NET Core endpoints for large result sets: instead of `Task<List<T>>` so that ASP.NET streams JSON array elements incrementally, reducing memory allocation and time-to-first-byte.
