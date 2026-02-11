---
title: "Use `Observable.Create` with a `CancellationToken` for async producers"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Use `Observable.Create` with a `CancellationToken` for async producers

Use `Observable.Create` with a `CancellationToken` for async producers: rather than wrapping `Task`-returning methods in `Observable.FromAsync`, because `Create` gives full control over the observable lifecycle and cancellation.
