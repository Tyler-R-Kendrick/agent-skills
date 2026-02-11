---
title: "Use `bus.Send()` for commands (routed to a specific..."
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Use `bus.Send()` for commands (routed to a specific...

Use `bus.Send()` for commands (routed to a specific endpoint) and `bus.Publish()` for events (fan-out to all subscribers) to maintain clear messaging semantics.
