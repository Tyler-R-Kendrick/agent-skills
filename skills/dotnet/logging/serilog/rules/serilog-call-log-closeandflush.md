---
title: "Call `Log.CloseAndFlush()`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Call `Log.CloseAndFlush()`

Call `Log.CloseAndFlush()`: in a `finally` block to ensure all buffered events are written before the process exits; without this, async sinks may lose the final batch.
