---
title: "Use `GetStateAndETagAsync` with `TrySaveStateAsync` for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Use `GetStateAndETagAsync` with `TrySaveStateAsync` for...

Use `GetStateAndETagAsync` with `TrySaveStateAsync` for optimistic concurrency on state operations that may conflict, rather than blind `SaveStateAsync` which silently overwrites concurrent changes.
