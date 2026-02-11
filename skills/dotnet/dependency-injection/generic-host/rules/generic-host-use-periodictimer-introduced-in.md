---
title: "Use `PeriodicTimer` (introduced in"
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Use `PeriodicTimer` (introduced in

Use `PeriodicTimer` (introduced in .NET 6) instead of `Task.Delay` in timer-based background services because it does not drift over time and respects cancellation cleanly.
