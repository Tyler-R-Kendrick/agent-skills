---
title: "Check `result.IsCompleted`"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Check `result.IsCompleted`

Check `result.IsCompleted`: after processing the buffer to detect when the writer signals completion, and exit the read loop cleanly.
