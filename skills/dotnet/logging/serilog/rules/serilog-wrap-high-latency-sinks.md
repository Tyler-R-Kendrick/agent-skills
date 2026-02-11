---
title: "Wrap high-latency sinks"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Wrap high-latency sinks

(file, database, network) with `Serilog.Sinks.Async` to prevent I/O from blocking the application's hot path.
