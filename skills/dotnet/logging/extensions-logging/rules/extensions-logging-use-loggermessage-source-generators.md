---
title: "Use `LoggerMessage` source generators"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Use `LoggerMessage` source generators

Use `LoggerMessage` source generators: for all logging in hot paths and production services to eliminate allocation overhead when the target log level is disabled.
