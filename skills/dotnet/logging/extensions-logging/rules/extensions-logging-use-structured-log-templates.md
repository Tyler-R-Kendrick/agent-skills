---
title: "Use structured log templates"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Use structured log templates

(`"Order {OrderId} processed"`) instead of string interpolation (`$"Order {orderId} processed"`) so log aggregators can index and query named properties.
