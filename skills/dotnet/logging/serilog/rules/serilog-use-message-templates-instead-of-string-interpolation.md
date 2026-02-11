---
title: "Use message templates instead of string interpolation"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Use message templates instead of string interpolation

(`"Order {OrderId}"` not `$"Order {orderId}"`) so structured properties are preserved in sinks like Seq and Elasticsearch.
