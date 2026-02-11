---
title: "Use `WithDataVolume()` on database resources (PostgreSQL,..."
impact: MEDIUM
impactDescription: "general best practice"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Use `WithDataVolume()` on database resources (PostgreSQL,...

Use `WithDataVolume()` on database resources (PostgreSQL, Redis) during development to persist data across container restarts rather than re-seeding on every startup.
