---
title: "Size bounded channels based on expected burst size, not average throughput"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Size bounded channels based on expected burst size, not average throughput

Size bounded channels based on expected burst size, not average throughput: if the producer can spike to 1000 items/second but the consumer processes 100 items/second, set the capacity to absorb a 10-second burst (10,000) or choose a `DropOldest` policy.
