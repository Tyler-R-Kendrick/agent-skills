---
title: "Use `FakeTimeProvider.Advance()` to simulate time progression"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Use `FakeTimeProvider.Advance()` to simulate time progression

Use `FakeTimeProvider.Advance()` to simulate time progression: advance by specific durations to test expiration, scheduling, and timeout logic without real waits.
