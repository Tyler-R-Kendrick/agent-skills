---
title: "Use `AddStandardHedgingHandler` for latency-critical read operations"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Use `AddStandardHedgingHandler` for latency-critical read operations

Use `AddStandardHedgingHandler` for latency-critical read operations: where sending parallel requests to multiple endpoints and taking the fastest response is acceptable; do not use hedging for write operations that are not idempotent.
