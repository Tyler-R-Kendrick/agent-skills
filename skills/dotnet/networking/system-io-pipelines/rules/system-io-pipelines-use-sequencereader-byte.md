---
title: "Use `SequenceReader<byte>`"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Use `SequenceReader<byte>`

Use `SequenceReader<byte>`: to parse multi-segment `ReadOnlySequence<byte>` buffers efficiently without copying them into a contiguous array.
