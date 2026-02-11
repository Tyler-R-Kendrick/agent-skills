---
title: "Prefer the `[Topic(\"pubsub\", \"topic-name\")]` attribute on..."
impact: LOW
impactDescription: "recommended but situational"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Prefer the `[Topic("pubsub", "topic-name")]` attribute on...

Prefer the `[Topic("pubsub", "topic-name")]` attribute on ASP.NET controller endpoints for declarative pub/sub subscriptions rather than programmatic subscription, which is harder to discover and test.
