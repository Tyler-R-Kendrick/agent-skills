---
title: "Use `WithExternalHttpEndpoints()` only on services that..."
impact: MEDIUM
impactDescription: "general best practice"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Use `WithExternalHttpEndpoints()` only on services that...

Use `WithExternalHttpEndpoints()` only on services that need external access (API gateways, frontend); internal services should only be reachable through service discovery.
