---
title: "Prefer constructor injection over `IServiceProvider"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Prefer constructor injection over `IServiceProvider

Prefer constructor injection over `IServiceProvider.GetService` (service locator pattern); injecting `IServiceProvider` hides dependencies and makes code harder to test.
