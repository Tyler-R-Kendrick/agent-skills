---
title: "Call `MarkAsComplete()` in sagas when the workflow ends to..."
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Call `MarkAsComplete()` in sagas when the workflow ends to...

Call `MarkAsComplete()` in sagas when the workflow ends to release persistence resources and signal that the saga instance can be deleted.
