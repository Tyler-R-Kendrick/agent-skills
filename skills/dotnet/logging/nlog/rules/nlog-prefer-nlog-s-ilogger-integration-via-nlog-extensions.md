---
title: "Prefer NLog's `ILogger` integration via `NLog.Extensions.Logging`"
impact: LOW
impactDescription: "recommended but situational"
tags: nlog, dotnet, logging, nlog-target-configuration, layout-renderers, structured-logging-with-nlog
---

## Prefer NLog's `ILogger` integration via `NLog.Extensions.Logging`

Prefer NLog's `ILogger` integration via `NLog.Extensions.Logging`: over direct `LogManager.GetCurrentClassLogger()` in new projects to maintain compatibility with the `Microsoft.Extensions.Logging` abstraction.
