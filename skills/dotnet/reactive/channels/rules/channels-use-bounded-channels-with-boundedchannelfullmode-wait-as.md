---
title: "Use bounded channels with `BoundedChannelFullMode.Wait` as the default"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Use bounded channels with `BoundedChannelFullMode.Wait` as the default

Use bounded channels with `BoundedChannelFullMode.Wait` as the default: to apply backpressure when the consumer cannot keep up, preventing unbounded memory growth that leads to `OutOfMemoryException` in production.
