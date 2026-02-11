---
title: "Use `It.Is<T>()` with predicates for complex argument validation"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Use `It.Is<T>()` with predicates for complex argument validation

Use `It.Is<T>()` with predicates for complex argument validation: instead of matching exact objects, validate specific properties with `It.Is<User>(u => u.Email.Contains("@"))`.
