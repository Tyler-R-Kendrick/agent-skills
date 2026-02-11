---
title: "Avoid slicing `ReadOnlySequence` into `byte[]`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Avoid slicing `ReadOnlySequence` into `byte[]`

(via `ToArray()`) except when absolutely necessary; work with the sequence directly or use `SequenceReader<byte>` to avoid copying.
