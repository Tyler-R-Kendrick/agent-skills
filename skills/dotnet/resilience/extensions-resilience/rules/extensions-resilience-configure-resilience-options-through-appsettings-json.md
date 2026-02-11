---
title: "Configure resilience options through `appsettings.json` rather than hardcoding values"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Configure resilience options through `appsettings.json` rather than hardcoding values

Configure resilience options through `appsettings.json` rather than hardcoding values: so that operations teams can tune retry counts, timeouts, and circuit breaker thresholds without redeploying the application.
