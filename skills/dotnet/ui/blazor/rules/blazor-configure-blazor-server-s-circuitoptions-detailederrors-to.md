---
title: "Configure Blazor Server's `CircuitOptions.DetailedErrors` to `true` only in Development"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Configure Blazor Server's `CircuitOptions.DetailedErrors` to `true` only in Development

Configure Blazor Server's `CircuitOptions.DetailedErrors` to `true` only in Development: and set `CircuitOptions.DisconnectedCircuitRetentionPeriod` to a bounded timespan (e.g., 3 minutes) in production to free server memory when users close browser tabs without disconnecting.
