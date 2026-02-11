---
title: "Test service invocation locally with `dapr run -- dotnet..."
impact: MEDIUM
impactDescription: "general best practice"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Test service invocation locally with `dapr run -- dotnet...

Test service invocation locally with `dapr run -- dotnet run` and verify component configurations with `dapr components -k` before deploying to Kubernetes or Azure Container Apps.
