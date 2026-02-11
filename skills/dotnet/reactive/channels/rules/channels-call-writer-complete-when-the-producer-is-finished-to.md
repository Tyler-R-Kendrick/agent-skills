---
title: "Call `Writer.Complete()` when the producer is finished to signal downstream consumers"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Call `Writer.Complete()` when the producer is finished to signal downstream consumers

Call `Writer.Complete()` when the producer is finished to signal downstream consumers: that no more items will arrive; this causes `ReadAllAsync()` to exit its enumeration loop gracefully and enables pipeline teardown.
