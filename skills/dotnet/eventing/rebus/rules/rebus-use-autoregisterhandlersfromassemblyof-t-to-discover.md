---
title: "Use `AutoRegisterHandlersFromAssemblyOf<T>()` to discover..."
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Use `AutoRegisterHandlersFromAssemblyOf<T>()` to discover...

Use `AutoRegisterHandlersFromAssemblyOf<T>()` to discover and register all `IHandleMessages<>` implementations automatically from the DI container.
