---
title: "Inject `DaprClient` from DI via `builder"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Inject `DaprClient` from DI via `builder

Inject `DaprClient` from DI via `builder.Services.AddDaprClient()` rather than constructing it with `new DaprClientBuilder().Build()`, to ensure consistent configuration and proper lifetime management.
