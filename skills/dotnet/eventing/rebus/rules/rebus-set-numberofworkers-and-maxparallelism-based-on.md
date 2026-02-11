---
title: "Set `NumberOfWorkers` and `MaxParallelism` based on..."
impact: MEDIUM
impactDescription: "general best practice"
tags: rebus, dotnet, eventing, lightweight-service-bus-messaging, pubsub-with-rabbitmq-or-azure-service-bus, saga-orchestration
---

## Set `NumberOfWorkers` and `MaxParallelism` based on...

Set `NumberOfWorkers` and `MaxParallelism` based on workload characteristics; more workers means more concurrent message processing but higher database contention.
