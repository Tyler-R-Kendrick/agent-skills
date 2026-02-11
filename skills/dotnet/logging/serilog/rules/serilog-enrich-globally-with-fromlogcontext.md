---
title: "Enrich globally with `FromLogContext`"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Enrich globally with `FromLogContext`

Enrich globally with `FromLogContext`: and push scoped properties (correlation ID, tenant ID) via `LogContext.PushProperty` so all downstream log events carry contextual data.
