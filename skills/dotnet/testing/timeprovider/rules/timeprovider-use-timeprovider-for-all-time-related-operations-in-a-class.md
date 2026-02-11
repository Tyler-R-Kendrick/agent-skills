---
title: "Use `TimeProvider` for all time-related operations in a class"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Use `TimeProvider` for all time-related operations in a class

Use `TimeProvider` for all time-related operations in a class: if a class uses both `GetUtcNow()` and `CreateTimer()`, both should come from the same injected `TimeProvider` instance for consistent behavior in tests.
