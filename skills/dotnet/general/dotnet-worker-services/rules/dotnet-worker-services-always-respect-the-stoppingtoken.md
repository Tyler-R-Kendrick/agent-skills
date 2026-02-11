---
title: "Always respect the `stoppingToken`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Always respect the `stoppingToken`

Always respect the `stoppingToken`: passed to `ExecuteAsync` -- check `IsCancellationRequested` in loops and pass the token to all async calls including `Task.Delay`.
