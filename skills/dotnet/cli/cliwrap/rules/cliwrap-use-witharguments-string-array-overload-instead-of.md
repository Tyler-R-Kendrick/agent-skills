---
title: "Use `WithArguments(string[])` (array overload) instead of..."
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Use `WithArguments(string[])` (array overload) instead of...

Use `WithArguments(string[])` (array overload) instead of `WithArguments(string)` (raw string) to get automatic escaping of spaces, quotes, and special characters in argument values.
