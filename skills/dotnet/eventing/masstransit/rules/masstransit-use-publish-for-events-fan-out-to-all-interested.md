---
title: "Use `Publish` for events (fan-out to all interested..."
impact: MEDIUM
impactDescription: "general best practice"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Use `Publish` for events (fan-out to all interested...

Use `Publish` for events (fan-out to all interested consumers) and `Send` for commands (point-to-point to a specific queue) to maintain clear messaging semantics.
