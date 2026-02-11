---
title: "Register multiple `BackgroundService` implementations"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Register multiple `BackgroundService` implementations

Register multiple `BackgroundService` implementations: for independent concerns (queue processing, health checks, cleanup) rather than combining them into a single monolithic worker.
