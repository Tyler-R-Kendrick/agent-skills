---
title: "Use `AddStandardResilienceHandler` for HttpClient resilience as the default"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Use `AddStandardResilienceHandler` for HttpClient resilience as the default

Use `AddStandardResilienceHandler` for HttpClient resilience as the default: because it provides Microsoft's recommended pipeline ordering (total timeout, retry, circuit breaker, attempt timeout) with sensible defaults that cover most scenarios.
