---
title: "Use `AddWindowsService()` or `AddSystemd()`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet-worker-services, dotnet, general, long-running-background-processing, message-queue-consumers, scheduled-jobs
---

## Use `AddWindowsService()` or `AddSystemd()`

Use `AddWindowsService()` or `AddSystemd()`: for production deployments so the worker integrates properly with the OS service manager for lifecycle events.
