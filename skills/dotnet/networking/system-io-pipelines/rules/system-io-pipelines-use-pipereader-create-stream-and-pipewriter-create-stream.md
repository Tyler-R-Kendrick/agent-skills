---
title: "Use `PipeReader.Create(stream)` and `PipeWriter.Create(stream)`"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Use `PipeReader.Create(stream)` and `PipeWriter.Create(stream)`

Use `PipeReader.Create(stream)` and `PipeWriter.Create(stream)`: to adapt existing `Stream`-based APIs to Pipelines incrementally, without rewriting the entire I/O stack at once.
