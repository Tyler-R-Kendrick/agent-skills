---
title: "Organize `LoggerMessage` methods"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Organize `LoggerMessage` methods

Organize `LoggerMessage` methods: in a single static partial class per bounded context (e.g., `OrderLogMessages`, `PaymentLogMessages`) with contiguous event ID ranges.
