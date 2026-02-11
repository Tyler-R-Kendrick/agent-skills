---
title: "Always call `reader.AdvanceTo(consumed, examined)`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Always call `reader.AdvanceTo(consumed, examined)`

Always call `reader.AdvanceTo(consumed, examined)`: to tell the pipe how much data was consumed (can be freed) and examined (do not re-read), preventing unbounded buffer growth.
