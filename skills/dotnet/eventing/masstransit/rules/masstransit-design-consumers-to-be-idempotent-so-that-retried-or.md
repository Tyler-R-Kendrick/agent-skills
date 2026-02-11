---
title: "Design consumers to be idempotent so that retried or..."
impact: MEDIUM
impactDescription: "general best practice"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Design consumers to be idempotent so that retried or...

Design consumers to be idempotent so that retried or redelivered messages produce the same result without side effects.
