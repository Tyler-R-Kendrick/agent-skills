---
title: "Wrap `ReadAllAsync()` consumption in a `try/catch` inside `BackgroundService.ExecuteAsync`"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Wrap `ReadAllAsync()` consumption in a `try/catch` inside `BackgroundService.ExecuteAsync`

Wrap `ReadAllAsync()` consumption in a `try/catch` inside `BackgroundService.ExecuteAsync`: so that a transient processing failure for one item does not crash the entire worker; log the error and continue processing the next item.
