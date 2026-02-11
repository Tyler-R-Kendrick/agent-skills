---
title: "Build pipelines once and reuse them"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Build pipelines once and reuse them

Build pipelines once and reuse them: because `ResiliencePipeline` instances are thread-safe and immutable after `Build()` is called; creating a new pipeline per request wastes resources and bypasses circuit breaker state.
