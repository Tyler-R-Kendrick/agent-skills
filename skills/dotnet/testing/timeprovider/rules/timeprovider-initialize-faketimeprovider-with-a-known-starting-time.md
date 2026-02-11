---
title: "Initialize `FakeTimeProvider` with a known starting time"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Initialize `FakeTimeProvider` with a known starting time

Initialize `FakeTimeProvider` with a known starting time: pass an explicit `DateTimeOffset` to the constructor (`new FakeTimeProvider(startTime)`) so test assertions are deterministic and readable.
