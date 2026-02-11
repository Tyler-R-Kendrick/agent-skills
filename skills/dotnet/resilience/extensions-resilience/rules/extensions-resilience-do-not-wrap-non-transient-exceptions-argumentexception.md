---
title: "Do not wrap non-transient exceptions (ArgumentException, ValidationException) in retry strategies"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Do not wrap non-transient exceptions (ArgumentException, ValidationException) in retry strategies

Do not wrap non-transient exceptions (ArgumentException, ValidationException) in retry strategies: use `ShouldHandle` predicates to retry only on transient faults like `HttpRequestException`, `TimeoutException`, and HTTP 429/503 status codes.
