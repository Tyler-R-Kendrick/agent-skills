---
title: "Set the `DOTNET_ENVIRONMENT` (or `ASPNETCORE_ENVIRONMENT`)..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Set the `DOTNET_ENVIRONMENT` (or `ASPNETCORE_ENVIRONMENT`)...

Set the `DOTNET_ENVIRONMENT` (or `ASPNETCORE_ENVIRONMENT`) environment variable to control which `appsettings.{Environment}.json` file is loaded, using `Development`, `Staging`, or `Production`.
