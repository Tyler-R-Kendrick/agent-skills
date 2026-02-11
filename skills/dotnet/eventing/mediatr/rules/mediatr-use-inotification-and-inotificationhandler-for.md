---
title: "Use `INotification` and `INotificationHandler<>` for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Use `INotification` and `INotificationHandler<>` for...

Use `INotification` and `INotificationHandler<>` for in-process fan-out events; for cross-service events, publish to a message broker instead.
