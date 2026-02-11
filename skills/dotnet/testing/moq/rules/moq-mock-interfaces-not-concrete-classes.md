---
title: "Mock interfaces, not concrete classes"
impact: MEDIUM
impactDescription: "general best practice"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Mock interfaces, not concrete classes

Mock interfaces, not concrete classes: design code against interfaces (`IUserRepository`) so mocks replace the real implementation cleanly without needing virtual methods.
