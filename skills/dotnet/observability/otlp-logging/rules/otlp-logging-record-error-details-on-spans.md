---
title: "Record error details on spans"
impact: MEDIUM
impactDescription: "general best practice"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Record error details on spans

Record error details on spans: using `activity?.SetStatus(ActivityStatusCode.Error, exception.Message)` and `activity?.RecordException(exception)` so error rates and stack traces are visible in the tracing backend.
