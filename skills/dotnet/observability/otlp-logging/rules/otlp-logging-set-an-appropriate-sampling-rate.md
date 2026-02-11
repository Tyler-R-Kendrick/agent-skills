---
title: "Set an appropriate sampling rate"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Set an appropriate sampling rate

Set an appropriate sampling rate: in production using `parentbased_traceidratio` (e.g., 10% via `OTEL_TRACES_SAMPLER_ARG=0.1`) to reduce storage costs while maintaining statistical significance.
