---
title: "Use `ExecuteBufferedAsync` only for commands with bounded..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Use `ExecuteBufferedAsync` only for commands with bounded...

Use `ExecuteBufferedAsync` only for commands with bounded output; for commands that may produce megabytes of output (e.g., `dotnet test --verbosity detailed`), use `ListenAsync` or pipe to a `Stream` to avoid memory pressure.
