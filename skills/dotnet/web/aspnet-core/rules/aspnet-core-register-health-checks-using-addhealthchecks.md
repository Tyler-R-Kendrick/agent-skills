---
title: "Register health checks using `AddHealthChecks().AddDbContextCheck<T>()` and `.AddCheck<CustomCheck>()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Register health checks using `AddHealthChecks().AddDbContextCheck<T>()` and `.AddCheck<CustomCheck>()`

Register health checks using `AddHealthChecks().AddDbContextCheck<T>()` and `.AddCheck<CustomCheck>()`: and expose them at `/health` with `MapHealthChecks`, so that orchestrators (Kubernetes, Azure App Service) can probe application readiness and liveness without hitting business endpoints.
