---
title: "Test handlers with `FakeBus` from `Rebus"
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Test handlers with `FakeBus` from `Rebus

Test handlers with `FakeBus` from `Rebus.TestHelpers` to assert sent commands and published events without needing a real transport or running bus.
