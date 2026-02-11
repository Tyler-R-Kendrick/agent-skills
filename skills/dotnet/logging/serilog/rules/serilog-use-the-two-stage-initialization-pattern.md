---
title: "Use the two-stage initialization pattern"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Use the two-stage initialization pattern

(bootstrap logger then full logger) so exceptions during host startup are captured and logged rather than lost to the void.
