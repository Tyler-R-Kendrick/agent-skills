---
title: "Register custom `Meter` names"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Register custom `Meter` names

Register custom `Meter` names: in `AddMeter("MyApp.Orders")` on the metrics builder; meters not registered are silently ignored, which is a common configuration mistake.
