---
title: "Set the shutdown timeout"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Set the shutdown timeout

Set the shutdown timeout: via `HostOptions.ShutdownTimeout` to give workers enough time to finish in-flight work before the process is killed.
