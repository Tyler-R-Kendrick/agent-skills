---
title: "Use `IHostApplicationLifetime"
impact: MEDIUM
impactDescription: "general best practice"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Use `IHostApplicationLifetime

Use `IHostApplicationLifetime.ApplicationStopping` to register cleanup callbacks for resources that are not managed by the DI container, such as external connections or file handles.
