---
title: "Avoid blocking `StartAsync`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Avoid blocking `StartAsync`

Avoid blocking `StartAsync`: when implementing `IHostedService` directly -- start your background task and return immediately so other hosted services can start.
