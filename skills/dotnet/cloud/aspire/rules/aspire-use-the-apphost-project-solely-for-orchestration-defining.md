---
title: "Use the AppHost project solely for orchestration (defining..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Use the AppHost project solely for orchestration (defining...

Use the AppHost project solely for orchestration (defining resources, references, and endpoints); never put business logic, controllers, or domain code in the AppHost.
