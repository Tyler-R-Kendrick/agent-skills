---
title: "Use Pipelines when `Stream` APIs become a bottleneck"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Use Pipelines when `Stream` APIs become a bottleneck

Use Pipelines when `Stream` APIs become a bottleneck: in protocol parsing or high-throughput I/O; for simple file reads or low-volume HTTP calls, `Stream` is sufficient.
