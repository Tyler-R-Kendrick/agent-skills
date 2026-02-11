---
title: "Handle errors at the subscription level with `onError` or in the pipeline with `Catch` and `Retry`"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Handle errors at the subscription level with `onError` or in the pipeline with `Catch` and `Retry`

Handle errors at the subscription level with `onError` or in the pipeline with `Catch` and `Retry`: because an unhandled `OnError` terminates the observable sequence permanently; after `OnError`, no more `OnNext` values are delivered.
