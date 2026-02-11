---
title: "Use the pipeline pattern (chained channels) for multi-stage processing"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Use the pipeline pattern (chained channels) for multi-stage processing

Use the pipeline pattern (chained channels) for multi-stage processing: rather than putting all logic in a single consumer, because separate stages can be scaled independently and each stage's backpressure propagates upstream through bounded channel boundaries.
