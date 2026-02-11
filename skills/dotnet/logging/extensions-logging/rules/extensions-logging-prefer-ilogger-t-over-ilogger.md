---
title: "Prefer `ILogger<T>` over `ILogger`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Prefer `ILogger<T>` over `ILogger`

Prefer `ILogger<T>` over `ILogger`: for constructor injection because the generic version automatically sets the category name to the fully-qualified type name.
