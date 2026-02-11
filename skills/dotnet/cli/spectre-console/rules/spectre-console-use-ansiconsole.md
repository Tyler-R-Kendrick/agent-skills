---
title: "Use `AnsiConsole"
impact: MEDIUM
impactDescription: "general best practice"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Use `AnsiConsole

Use `AnsiConsole.MarkupLine` with Spectre markup tags (`[green]`, `[bold]`, `[underline]`) instead of `Console.Write` with ANSI escape codes for portable colorized output that degrades gracefully on terminals without color support.
