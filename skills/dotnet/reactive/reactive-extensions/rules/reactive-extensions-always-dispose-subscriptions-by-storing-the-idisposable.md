---
title: "Always dispose subscriptions by storing the `IDisposable` returned by `Subscribe` and calling `Dispose` when done"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Always dispose subscriptions by storing the `IDisposable` returned by `Subscribe` and calling `Dispose` when done

Always dispose subscriptions by storing the `IDisposable` returned by `Subscribe` and calling `Dispose` when done: to prevent memory leaks; use `CompositeDisposable` to manage multiple subscriptions in a single `Dispose` call.
