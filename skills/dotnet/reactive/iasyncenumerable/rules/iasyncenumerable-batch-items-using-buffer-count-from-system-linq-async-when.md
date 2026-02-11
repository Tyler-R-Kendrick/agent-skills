---
title: "Batch items using `Buffer(count)` from System.Linq.Async when processing items individually is too slow"
impact: MEDIUM
impactDescription: "general best practice"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Batch items using `Buffer(count)` from System.Linq.Async when processing items individually is too slow

Batch items using `Buffer(count)` from System.Linq.Async when processing items individually is too slow: for example, inserting 100 rows at a time into a database instead of one at a time, reducing round-trip overhead.
