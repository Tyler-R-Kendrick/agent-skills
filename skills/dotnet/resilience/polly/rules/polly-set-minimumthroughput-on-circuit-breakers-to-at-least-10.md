---
title: "Set `MinimumThroughput` on circuit breakers to at least 10"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Set `MinimumThroughput` on circuit breakers to at least 10

Set `MinimumThroughput` on circuit breakers to at least 10: to prevent the circuit from tripping during low-traffic periods where a single failure could exceed the failure ratio; this ensures statistical significance.
