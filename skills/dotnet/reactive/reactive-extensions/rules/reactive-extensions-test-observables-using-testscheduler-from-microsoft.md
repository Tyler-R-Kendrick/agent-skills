---
title: "Test observables using `TestScheduler` from `Microsoft.Reactive.Testing`"
impact: MEDIUM
impactDescription: "general best practice"
tags: reactive-extensions, dotnet, reactive, composing-event-streams, ui-events, timers
---

## Test observables using `TestScheduler` from `Microsoft.Reactive.Testing`

Test observables using `TestScheduler` from `Microsoft.Reactive.Testing`: to control virtual time and verify time-dependent operators (`Throttle`, `Buffer`, `Delay`) deterministically without waiting for real time to pass.
