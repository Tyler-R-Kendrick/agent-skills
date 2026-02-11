---
title: "Install `Microsoft.Extensions.TimeProvider.Testing` only in test projects"
impact: MEDIUM
impactDescription: "general best practice"
tags: timeprovider, dotnet, testing, making-time-dependent-code-testable, replacing-datetimeutcnow-and-datetimeoffsetutcnow-with-injectable-abstractions, controlling-time-in-unit-tests-with-faketimeprovider
---

## Install `Microsoft.Extensions.TimeProvider.Testing` only in test projects

Install `Microsoft.Extensions.TimeProvider.Testing` only in test projects: the base `TimeProvider` class is built into .NET 8+; the `FakeTimeProvider` package is a test-only dependency.
