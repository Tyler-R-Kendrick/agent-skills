---
title: "Avoid mixing `TimeProvider` with direct `Task.Delay` calls"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Avoid mixing `TimeProvider` with direct `Task.Delay` calls

Avoid mixing `TimeProvider` with direct `Task.Delay` calls: use `timeProvider.CreateTimer()` or `Task.Delay(duration, timeProvider)` (via extension methods) so delays are also controllable in tests.
