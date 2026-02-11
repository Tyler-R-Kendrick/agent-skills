---
title: "Return `ValueTask<T>` from handlers for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Return `ValueTask<T>` from handlers for...

Return `ValueTask<T>` from handlers for synchronous-fast-path optimization; Mediator.NET uses `ValueTask` throughout, reducing allocations for handlers that complete synchronously.
