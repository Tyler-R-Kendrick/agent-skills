---
title: "Use the `|` pipe operator between `Command` instances..."
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Use the `|` pipe operator between `Command` instances...

Use the `|` pipe operator between `Command` instances (`cmdA | cmdB`) for shell-like piping instead of capturing intermediate output in memory and feeding it to the next process.
