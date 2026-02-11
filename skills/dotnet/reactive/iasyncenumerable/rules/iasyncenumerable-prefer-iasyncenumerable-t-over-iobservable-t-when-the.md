---
title: "Prefer `IAsyncEnumerable<T>` over `IObservable<T>` when the consumer controls the pace"
impact: LOW
impactDescription: "recommended but situational"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Prefer `IAsyncEnumerable<T>` over `IObservable<T>` when the consumer controls the pace

(pull-based) -- database queries, file reading, paginated APIs -- and prefer `IObservable<T>` when the producer controls the pace (push-based) -- UI events, message bus subscriptions.
