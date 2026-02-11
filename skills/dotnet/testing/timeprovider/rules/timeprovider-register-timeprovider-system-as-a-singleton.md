---
title: "Register `TimeProvider.System` as a singleton"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Register `TimeProvider.System` as a singleton

Register `TimeProvider.System` as a singleton: the system time provider is stateless and thread-safe; register it once at the composition root.
