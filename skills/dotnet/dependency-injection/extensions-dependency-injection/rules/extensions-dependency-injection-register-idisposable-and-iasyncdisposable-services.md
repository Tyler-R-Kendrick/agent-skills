---
title: "Register `IDisposable` and `IAsyncDisposable` services..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Register `IDisposable` and `IAsyncDisposable` services...

Register `IDisposable` and `IAsyncDisposable` services through the container rather than creating them manually, so the container manages their disposal at the correct time.
