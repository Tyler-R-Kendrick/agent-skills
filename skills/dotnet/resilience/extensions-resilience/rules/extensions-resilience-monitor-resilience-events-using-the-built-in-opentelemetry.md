---
title: "Monitor resilience events using the built-in OpenTelemetry integration"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Monitor resilience events using the built-in OpenTelemetry integration

Monitor resilience events using the built-in OpenTelemetry integration: by calling `builder.Services.AddOpenTelemetry()` with `AddMeter("Polly")` to track retry counts, circuit breaker state transitions, and timeout rates in your observability platform.
