---
title: "Export to an OpenTelemetry Collector"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Export to an OpenTelemetry Collector

Export to an OpenTelemetry Collector: rather than directly to backends, so you can fan out to multiple destinations, apply transformations, and change backends without redeploying the application.
