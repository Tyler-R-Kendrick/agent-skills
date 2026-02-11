---
title: "Avoid logging sensitive data"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Avoid logging sensitive data

Avoid logging sensitive data: by using Serilog's `Destructure.ByTransforming<T>()` to mask or omit sensitive fields before they reach any sink.
