---
title: "Call `LogManager.Shutdown()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Call `LogManager.Shutdown()`

Call `LogManager.Shutdown()`: in the application's finally block or `IHostApplicationLifetime.ApplicationStopping` to flush all buffered log entries before process exit.
