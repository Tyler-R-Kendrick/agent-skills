---
title: "Use the Dapr sidecar architecture exclusively; never embed..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Use the Dapr sidecar architecture exclusively; never embed...

Use the Dapr sidecar architecture exclusively; never embed Dapr functionality in-process because the sidecar handles mTLS, retries, and component lifecycle independently of your application code.
