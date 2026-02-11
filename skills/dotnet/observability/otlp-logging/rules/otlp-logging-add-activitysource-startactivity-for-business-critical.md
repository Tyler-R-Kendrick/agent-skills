---
title: "Add `ActivitySource.StartActivity` for business-critical operations"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: otlp-logging, dotnet, observability, otlp-log-export, opentelemetry-traces-and-metrics, distributed-tracing-with-activity-api
---

## Add `ActivitySource.StartActivity` for business-critical operations

(order processing, payment charging, inventory updates) to create custom spans that appear in the trace timeline alongside framework spans.
