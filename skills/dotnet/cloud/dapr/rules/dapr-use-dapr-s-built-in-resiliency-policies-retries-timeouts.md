---
title: "Use Dapr's built-in resiliency policies (retries, timeouts,..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Use Dapr's built-in resiliency policies (retries, timeouts,...

Use Dapr's built-in resiliency policies (retries, timeouts, circuit breakers) configured via YAML rather than implementing application-level resilience with Polly, to keep resilience concerns out of application code.
