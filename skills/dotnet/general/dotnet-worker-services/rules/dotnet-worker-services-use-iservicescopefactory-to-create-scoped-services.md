---
title: "Use `IServiceScopeFactory` to create scoped services"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Use `IServiceScopeFactory` to create scoped services

Use `IServiceScopeFactory` to create scoped services: inside worker loops because `BackgroundService` is a singleton and cannot inject scoped dependencies directly.
