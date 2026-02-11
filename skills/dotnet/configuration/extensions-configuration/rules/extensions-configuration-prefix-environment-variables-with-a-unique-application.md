---
title: "Prefix environment variables with a unique application..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-configuration, dotnet, configuration, loading-application-settings-from-json-files, environment-variables, command-line-arguments
---

## Prefix environment variables with a unique application...

Prefix environment variables with a unique application identifier (e.g., `MYAPP_`) and call `AddEnvironmentVariables("MYAPP_")` to avoid accidentally reading unrelated host variables.
