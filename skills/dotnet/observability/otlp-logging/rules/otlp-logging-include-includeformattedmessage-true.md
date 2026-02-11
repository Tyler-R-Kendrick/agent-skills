---
title: "Include `IncludeFormattedMessage = true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Include `IncludeFormattedMessage = true`

Include `IncludeFormattedMessage = true`: and `IncludeScopes = true` in the logging exporter configuration so log messages in the backend are human-readable and include scope properties.
