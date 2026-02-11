---
title: "Verify only meaningful interactions"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Verify only meaningful interactions

Verify only meaningful interactions: verify calls that represent important side effects (saves, notifications, auditing); do not verify every getter call as it couples tests to implementation.
