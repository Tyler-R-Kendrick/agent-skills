---
title: "Test interceptors in isolation"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Test interceptors in isolation

Test interceptors in isolation: by creating a mock `AspectContext` and `AspectDelegate` to verify before/after behavior without standing up the full DI container.
