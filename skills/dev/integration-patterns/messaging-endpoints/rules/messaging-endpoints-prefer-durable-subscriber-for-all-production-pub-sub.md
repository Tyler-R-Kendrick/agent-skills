---
title: "Prefer Durable Subscriber for all production pub-sub..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: messaging-endpoints, dev, integration-patterns, consumer-patterns, polling-vs-event-driven-consumers, competing-consumers
---

## Prefer Durable Subscriber for all production pub-sub...

Prefer Durable Subscriber for all production pub-sub subscriptions; non-durable subscriptions lose messages during deployments.
