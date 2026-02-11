---
title: "Prefer the in-memory transport for local development and..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Prefer the in-memory transport for local development and...

Prefer the in-memory transport for local development and unit tests; switch to a real broker (RabbitMQ, Azure SB) via configuration for staging and production.
