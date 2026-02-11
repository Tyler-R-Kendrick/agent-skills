---
title: "Use `MockBehavior.Strict` for critical business logic"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Use `MockBehavior.Strict` for critical business logic

Use `MockBehavior.Strict` for critical business logic: strict mocks throw on unexpected calls, catching bugs where the system-under-test calls dependencies it should not.
