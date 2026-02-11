---
title: "Never call `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in application code"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Never call `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in application code

Never call `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in application code: always inject `TimeProvider` and call `GetUtcNow()` so time can be controlled in tests.
