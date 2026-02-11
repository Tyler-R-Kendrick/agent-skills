---
title: "Test resilience pipelines by injecting controlled failures"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Test resilience pipelines by injecting controlled failures

Test resilience pipelines by injecting controlled failures: using a test `DelegatingHandler` that returns HTTP 503 or throws `HttpRequestException` on specific calls to verify that retry counts, circuit breaker transitions, and timeout behavior work as configured.
