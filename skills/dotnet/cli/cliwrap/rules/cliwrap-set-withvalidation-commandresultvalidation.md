---
title: "Set `WithValidation(CommandResultValidation"
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Set `WithValidation(CommandResultValidation

Set `WithValidation(CommandResultValidation.ZeroExitCode)` explicitly (or rely on the default) to get `CommandExecutionException` on failure rather than silently ignoring non-zero exit codes.
