---
title: "Configure `BackgroundServiceExceptionBehavior`"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Configure `BackgroundServiceExceptionBehavior`

Configure `BackgroundServiceExceptionBehavior`: explicitly -- the default in .NET 8+ stops the host on unhandled exceptions, which may not be desired for resilient workers.
