---
title: "Call `CompleteAsync` on both `PipeReader` and `PipeWriter`"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Call `CompleteAsync` on both `PipeReader` and `PipeWriter`

Call `CompleteAsync` on both `PipeReader` and `PipeWriter`: when done, passing an exception if the operation failed, to signal the other side and release pooled buffers.
