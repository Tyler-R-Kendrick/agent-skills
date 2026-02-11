---
title: "Always pass `CancellationToken` to `ExecuteAsync` and..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Always pass `CancellationToken` to `ExecuteAsync` and...

Always pass `CancellationToken` to `ExecuteAsync` and `ExecuteBufferedAsync`; use `CancellationTokenSource.CancelAfter` to enforce timeouts on long-running commands.
