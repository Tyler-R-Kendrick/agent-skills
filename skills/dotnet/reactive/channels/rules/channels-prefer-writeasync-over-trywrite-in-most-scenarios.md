---
title: "Prefer `WriteAsync` over `TryWrite` in most scenarios"
impact: LOW
impactDescription: "recommended but situational"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Prefer `WriteAsync` over `TryWrite` in most scenarios

Prefer `WriteAsync` over `TryWrite` in most scenarios: because `WriteAsync` awaits capacity in bounded channels and reports cancellation correctly, while `TryWrite` silently drops items when the channel is full.
