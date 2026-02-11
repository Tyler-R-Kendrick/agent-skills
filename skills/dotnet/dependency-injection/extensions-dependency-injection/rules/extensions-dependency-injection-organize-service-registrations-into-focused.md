---
title: "Organize service registrations into focused..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Organize service registrations into focused...

Organize service registrations into focused `IServiceCollection` extension methods grouped by feature or layer (e.g., `AddDataAccess`, `AddMessaging`) and call them from `Program.cs`.
