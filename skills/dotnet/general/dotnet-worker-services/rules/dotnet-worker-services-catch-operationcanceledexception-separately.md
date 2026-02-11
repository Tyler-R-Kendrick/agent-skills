---
title: "Catch `OperationCanceledException` separately"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Catch `OperationCanceledException` separately

Catch `OperationCanceledException` separately: from other exceptions in your main loop to distinguish graceful shutdown from actual errors.
