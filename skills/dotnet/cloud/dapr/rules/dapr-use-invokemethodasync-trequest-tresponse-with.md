---
title: "Use `InvokeMethodAsync<TRequest, TResponse>` with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Use `InvokeMethodAsync<TRequest, TResponse>` with...

Use `InvokeMethodAsync<TRequest, TResponse>` with strongly-typed generic parameters rather than working with raw HTTP responses, to get automatic serialization and type safety.
