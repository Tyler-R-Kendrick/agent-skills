---
title: "Test boundary conditions around time transitions"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Test boundary conditions around time transitions

Test boundary conditions around time transitions: verify behavior at exactly the expiration moment, one millisecond before, and one millisecond after to catch off-by-one errors in time comparisons.
