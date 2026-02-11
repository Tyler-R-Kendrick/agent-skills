---
title: "Always call `ConfigureEndpoints(context)` on the bus..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Always call `ConfigureEndpoints(context)` on the bus...

Always call `ConfigureEndpoints(context)` on the bus configuration to let MassTransit automatically wire consumer endpoints using conventions.
