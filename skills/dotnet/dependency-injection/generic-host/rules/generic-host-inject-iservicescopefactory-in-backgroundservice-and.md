---
title: "Inject `IServiceScopeFactory` in `BackgroundService` and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Inject `IServiceScopeFactory` in `BackgroundService` and...

Inject `IServiceScopeFactory` in `BackgroundService` and create a new scope per iteration to resolve scoped services like `DbContext` safely without captive dependency issues.
