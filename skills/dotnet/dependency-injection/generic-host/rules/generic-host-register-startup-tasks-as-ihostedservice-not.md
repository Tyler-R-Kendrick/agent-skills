---
title: "Register startup tasks as `IHostedService` (not..."
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Register startup tasks as `IHostedService` (not...

Register startup tasks as `IHostedService` (not `BackgroundService`) when they need to complete before other services start, since hosted services start in registration order.
