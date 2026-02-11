---
title: "Use keyed services (`"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Use keyed services (`

Use keyed services (`.AddKeyedSingleton`, `[FromKeyedServices]`) in .NET 8+ instead of custom factory patterns when the same interface has multiple implementations selected by name.
