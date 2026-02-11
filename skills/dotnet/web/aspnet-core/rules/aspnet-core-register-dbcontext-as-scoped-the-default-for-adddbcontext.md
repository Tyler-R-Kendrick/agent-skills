---
title: "Register `DbContext` as `Scoped` (the default for `AddDbContext`) and never inject it into `Singleton` services"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Register `DbContext` as `Scoped` (the default for `AddDbContext`) and never inject it into `Singleton` services

Register `DbContext` as `Scoped` (the default for `AddDbContext`) and never inject it into `Singleton` services: because `DbContext` is not thread-safe; injecting a scoped service into a singleton creates a captive dependency that shares a single `DbContext` across concurrent requests, causing data corruption.
