---
title: "Set `SingleReader = true` when only one consumer reads from the channel"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Set `SingleReader = true` when only one consumer reads from the channel

Set `SingleReader = true` when only one consumer reads from the channel: because the channel implementation uses a more efficient lock-free algorithm when it knows only one thread reads, improving throughput by 20-40%.
