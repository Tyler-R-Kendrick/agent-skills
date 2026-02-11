---
title: "Use `Callback` to capture arguments for later assertions"
impact: MEDIUM
impactDescription: "general best practice"
tags: moq, dotnet, testing, creating-mock-objects-for-interfaces, stubbing-method-return-values, verifying-method-invocations
---

## Use `Callback` to capture arguments for later assertions

Use `Callback` to capture arguments for later assertions: when you need to verify the exact object passed to a method, capture it in a callback and assert its properties separately.
