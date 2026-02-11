---
title: "Use `builder"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: aspire, dotnet, cloud, orchestrating-multi-service-net-applications, adding-redispostgresqlrabbitmq-with-one-line, built-in-opentelemetry-observability
---

## Use `builder

Use `builder.AddParameter("key", secret: true)` for sensitive values (API keys, passwords) instead of hardcoding them; Aspire prompts for these during `azd up` and stores them securely.
