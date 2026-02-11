---
title: "Use `FakeTimeProvider.SetUtcNow()` to jump to specific points in time"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Use `FakeTimeProvider.SetUtcNow()` to jump to specific points in time

Use `FakeTimeProvider.SetUtcNow()` to jump to specific points in time: for testing scenarios like "what happens on December 31st", set the exact date rather than calculating an advance duration.
