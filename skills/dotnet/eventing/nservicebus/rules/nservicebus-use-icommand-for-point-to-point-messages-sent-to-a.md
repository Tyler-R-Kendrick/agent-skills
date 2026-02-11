---
title: "Use `ICommand` for point-to-point messages sent to a..."
impact: MEDIUM
impactDescription: "general best practice"
tags: nservicebus, dotnet, eventing, enterprise-messaging, durable-message-handling, saga-orchestration
---

## Use `ICommand` for point-to-point messages sent to a...

Use `ICommand` for point-to-point messages sent to a specific endpoint and `IEvent` for pub/sub messages consumed by multiple subscribers.
