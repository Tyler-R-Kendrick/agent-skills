---
title: "Use `AnsiConsole"
impact: MEDIUM
impactDescription: "general best practice"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Use `AnsiConsole

Use `AnsiConsole.Status()` with a spinner for short operations (under 10 seconds) and `AnsiConsole.Progress()` with named tasks for longer operations where users need to see which step is running.
