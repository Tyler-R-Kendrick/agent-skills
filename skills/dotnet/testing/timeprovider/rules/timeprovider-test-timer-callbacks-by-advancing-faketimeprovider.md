---
title: "Test timer callbacks by advancing `FakeTimeProvider`"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Test timer callbacks by advancing `FakeTimeProvider`

Test timer callbacks by advancing `FakeTimeProvider`: timers created via `timeProvider.CreateTimer()` fire synchronously when `Advance()` crosses their due time, enabling timer testing without `Task.Delay`.
