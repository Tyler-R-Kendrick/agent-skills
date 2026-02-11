---
title: "Override framework log levels"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Override framework log levels

(`Microsoft.AspNetCore`, `Microsoft.EntityFrameworkCore`) to `Warning` in production to reduce high-volume noise from internal framework logging.
