---
title: "Enable second-level retries for handlers that may fail..."
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Enable second-level retries for handlers that may fail...

Enable second-level retries for handlers that may fail persistently; implement `IHandleMessages<IFailed<T>>` to decide whether to defer, dead-letter, or alert.
