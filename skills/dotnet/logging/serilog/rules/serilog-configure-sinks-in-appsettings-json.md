---
title: "Configure sinks in `appsettings.json`"
impact: MEDIUM
impactDescription: "general best practice"
tags: serilog, dotnet, logging, serilog-sink-configuration, structured-event-logging, log-enrichment
---

## Configure sinks in `appsettings.json`

Configure sinks in `appsettings.json`: via `Serilog.Settings.Configuration` so operations can add or remove sinks and adjust levels without code changes or redeployment.
