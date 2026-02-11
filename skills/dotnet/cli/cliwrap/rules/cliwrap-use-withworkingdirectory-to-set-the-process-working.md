---
title: "Use `WithWorkingDirectory` to set the process working..."
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Use `WithWorkingDirectory` to set the process working...

Use `WithWorkingDirectory` to set the process working directory explicitly rather than relying on the host application's current directory, which may differ between development and deployment.
