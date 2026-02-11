---
title: "Enable the transactional outbox (`AddEntityFrameworkOutbox`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Enable the transactional outbox (`AddEntityFrameworkOutbox`...

Enable the transactional outbox (`AddEntityFrameworkOutbox` + `UseBusOutbox`) to guarantee at-least-once delivery of messages published within a database transaction.
