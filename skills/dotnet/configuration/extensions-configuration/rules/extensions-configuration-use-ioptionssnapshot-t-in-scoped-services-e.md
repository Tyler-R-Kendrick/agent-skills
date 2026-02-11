---
title: "Use `IOptionsSnapshot<T>` in scoped services (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Use `IOptionsSnapshot<T>` in scoped services (e

Use `IOptionsSnapshot<T>` in scoped services (e.g., per-request in ASP.NET Core) when configuration files are set to `reloadOnChange: true` so that changes take effect without restarting.
