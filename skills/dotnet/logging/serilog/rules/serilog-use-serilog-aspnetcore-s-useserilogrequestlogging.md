---
title: "Use `Serilog.AspNetCore`'s `UseSerilogRequestLogging()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Use `Serilog.AspNetCore`'s `UseSerilogRequestLogging()`

Use `Serilog.AspNetCore`'s `UseSerilogRequestLogging()`: instead of the default ASP.NET Core request logging to get a single structured event per request with timing, status code, and custom properties.
