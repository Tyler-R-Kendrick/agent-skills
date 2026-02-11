---
title: "Use `PeriodicTimer` instead of `Task.Delay` in a loop"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Use `PeriodicTimer` instead of `Task.Delay` in a loop

Use `PeriodicTimer` instead of `Task.Delay` in a loop: for timed tasks because `PeriodicTimer` accounts for processing time and does not drift.
