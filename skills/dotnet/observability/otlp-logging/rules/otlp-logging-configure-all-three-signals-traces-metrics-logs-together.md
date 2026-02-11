---
title: "Configure all three signals (traces, metrics, logs) together"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Configure all three signals (traces, metrics, logs) together

Configure all three signals (traces, metrics, logs) together: with a shared `Resource` so the observability backend can correlate data from the same service instance.
