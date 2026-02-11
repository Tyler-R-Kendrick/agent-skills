---
title: "Set `useSynchronizationContext: false`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Set `useSynchronizationContext: false`

Set `useSynchronizationContext: false`: in `PipeOptions` for server-side code to avoid posting continuations to the synchronization context, which can cause deadlocks.
