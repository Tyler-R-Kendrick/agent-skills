---
title: "Handle `CommandExecutionException` specifically (not just..."
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Handle `CommandExecutionException` specifically (not just...

Handle `CommandExecutionException` specifically (not just `Exception`) to extract the exit code and command details for structured error reporting and logging.
