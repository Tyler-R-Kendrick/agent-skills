---
title: "Configure type-based routing at startup (`TypeBased()"
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Configure type-based routing at startup (`TypeBased()

Configure type-based routing at startup (`TypeBased().Map<T>()`) so command routing is explicit and centralized rather than scattered across sending code.
