---
title: "Use `PipeTarget"
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Use `PipeTarget

Use `PipeTarget.Merge` to send output to both a log file and the console simultaneously during build/deploy scripts where you need real-time feedback and a persistent record.
