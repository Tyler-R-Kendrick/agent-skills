---
title: "Store secrets in a Dapr secret store component (Azure Key..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dapr, dotnet, cloud, service-to-service-invocation-with-automatic-mtls, distributed-state-management-with-pluggable-stores, pubsub-messaging-with-topic-subscriptions
---

## Store secrets in a Dapr secret store component (Azure Key...

Store secrets in a Dapr secret store component (Azure Key Vault, HashiCorp Vault, local file) and access them via `DaprClient.GetSecretAsync` rather than reading environment variables directly, to centralize secret management across services.
