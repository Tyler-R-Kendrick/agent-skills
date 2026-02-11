---
title: "Configure `HostOptions"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Configure `HostOptions

Configure `HostOptions.ShutdownTimeout` to a value that matches your longest cleanup operation (default is 30 seconds) to avoid forceful termination during graceful shutdown.
