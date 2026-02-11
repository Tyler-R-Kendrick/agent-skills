---
title: "Always catch and log exceptions inside `ExecuteAsync`..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: generic-host, dotnet, dependency-injection, building-console-applications, background-services, and-worker-processes-with-standardized-di
---

## Always catch and log exceptions inside `ExecuteAsync`...

Always catch and log exceptions inside `ExecuteAsync` loops; an unhandled exception terminates the hosted service and, depending on configuration, may crash the entire application.
