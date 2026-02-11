---
title: "Use `ChannelReader<T>` and `ChannelWriter<T>` as the injected types"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: channels, dotnet, reactive, implementing-high-performance-producerconsumer-queues-with-backpressure-using-systemthreadingchannels-for-background-processing, pipelines, and-async-message-passing
---

## Use `ChannelReader<T>` and `ChannelWriter<T>` as the injected types

Use `ChannelReader<T>` and `ChannelWriter<T>` as the injected types: rather than `Channel<T>` itself to enforce the separation of concerns between producers (which only need the writer) and consumers (which only need the reader).
