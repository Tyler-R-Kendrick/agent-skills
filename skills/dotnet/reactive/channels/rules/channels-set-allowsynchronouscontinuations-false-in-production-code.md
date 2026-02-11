---
title: "Set `AllowSynchronousContinuations = false` in production code"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Set `AllowSynchronousContinuations = false` in production code

Set `AllowSynchronousContinuations = false` in production code: to prevent the writer's thread from executing the reader's continuation synchronously, which can cause stack overflows in deep producer chains and unpredictable latency.
