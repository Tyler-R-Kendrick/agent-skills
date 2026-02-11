---
title: "Use `bus.Defer()` for delayed message delivery (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Use `bus.Defer()` for delayed message delivery (e

Use `bus.Defer()` for delayed message delivery (e.g., reminders, scheduled tasks) rather than implementing custom schedulers.
