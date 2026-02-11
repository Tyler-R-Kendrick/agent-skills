---
title: "Configure `pauseWriterThreshold` and `resumeWriterThreshold`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Configure `pauseWriterThreshold` and `resumeWriterThreshold`

Configure `pauseWriterThreshold` and `resumeWriterThreshold`: to implement backpressure and prevent out-of-memory conditions when the writer produces data faster than the reader consumes it.
