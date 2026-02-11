---
title: "Use `Times.Once` or `Times.Never` for explicit call verification"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Use `Times.Once` or `Times.Never` for explicit call verification

Use `Times.Once` or `Times.Never` for explicit call verification: always specify the expected call count rather than relying on implicit verification through `VerifyAll()`.
