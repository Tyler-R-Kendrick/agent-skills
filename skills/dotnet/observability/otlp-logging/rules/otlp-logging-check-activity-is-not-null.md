---
title: "Check `activity is not null`"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Check `activity is not null`

Check `activity is not null`: before calling `SetTag` or `AddEvent` because `StartActivity` returns null when no listener (sampler) is active for the source, which is expected behavior.
