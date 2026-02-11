---
title: "Use Polly v8's `ResiliencePipelineBuilder` API exclusively"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Use Polly v8's `ResiliencePipelineBuilder` API exclusively

Use Polly v8's `ResiliencePipelineBuilder` API exclusively: and do not mix it with the legacy v7 `Policy` API; v8 pipelines are allocation-free on the hot path and provide built-in telemetry that v7 policies do not.
