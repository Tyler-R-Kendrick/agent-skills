---
title: "Set environment variables with `WithEnvironmentVariables`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Set environment variables with `WithEnvironmentVariables`...

Set environment variables with `WithEnvironmentVariables` rather than modifying `Environment.SetEnvironmentVariable` globally, which affects all threads and is not isolated per command.
