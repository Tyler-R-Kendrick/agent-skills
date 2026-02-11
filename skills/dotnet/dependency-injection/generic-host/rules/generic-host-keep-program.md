---
title: "Keep `Program"
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Keep `Program

Keep `Program.cs` focused on host configuration and registration; move service registration into `IServiceCollection` extension methods and keep business logic in separate classes.
