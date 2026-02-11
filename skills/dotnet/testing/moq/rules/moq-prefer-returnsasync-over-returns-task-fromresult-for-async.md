---
title: "Prefer `ReturnsAsync` over `Returns(Task.FromResult(...))` for async methods"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Prefer `ReturnsAsync` over `Returns(Task.FromResult(...))` for async methods

`ReturnsAsync` is more readable and creates a new completed task per invocation, avoiding shared-task bugs.
