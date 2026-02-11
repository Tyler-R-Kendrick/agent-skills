---
title: "Prefer Aspire's `AddNpgsqlDbContext<T>(\"name\")` over manual..."
impact: LOW
impactDescription: "recommended but situational"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Prefer Aspire's `AddNpgsqlDbContext<T>("name")` over manual...

Prefer Aspire's `AddNpgsqlDbContext<T>("name")` over manual `DbContext` configuration because it automatically wires connection strings from service discovery, configures health checks, and adds OpenTelemetry instrumentation.
