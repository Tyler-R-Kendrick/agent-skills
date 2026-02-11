---
title: "Prefer `Microsoft.Extensions.Http.Resilience` with `AddStandardResilienceHandler` for HttpClient resilience"
impact: LOW
impactDescription: "recommended but situational"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Prefer `Microsoft.Extensions.Http.Resilience` with `AddStandardResilienceHandler` for HttpClient resilience

Prefer `Microsoft.Extensions.Http.Resilience` with `AddStandardResilienceHandler` for HttpClient resilience: over manually constructing Polly pipelines, because the standard handler provides Microsoft-tested defaults and integrates with `IHttpClientFactory` lifecycle management.
