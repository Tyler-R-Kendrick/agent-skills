---
title: "Register the channel and its hosted service as singletons"
impact: MEDIUM
impactDescription: "general best practice"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Register the channel and its hosted service as singletons

Register the channel and its hosted service as singletons: because channels are designed to be long-lived shared objects; scoped or transient channels lose their contents when the scope ends.
