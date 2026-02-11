---
title: "Use named options (`services"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Use named options (`services

Use named options (`services.Configure<T>("name", ...)`) when the same options type is used with different configuration sections, such as multiple database connections.
