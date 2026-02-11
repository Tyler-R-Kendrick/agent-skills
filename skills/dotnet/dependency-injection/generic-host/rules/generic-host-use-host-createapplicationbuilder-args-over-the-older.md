---
title: "Use `Host.CreateApplicationBuilder(args)` over the older..."
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Use `Host.CreateApplicationBuilder(args)` over the older...

Use `Host.CreateApplicationBuilder(args)` over the older `Host.CreateDefaultBuilder(args).ConfigureServices(...)` pattern for cleaner, more concise setup in .NET 8+.
