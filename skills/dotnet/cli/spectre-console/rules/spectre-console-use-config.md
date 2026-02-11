---
title: "Use `config"
impact: MEDIUM
impactDescription: "general best practice"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Use `config

Use `config.AddBranch` in `Spectre.Console.Cli` to group related subcommands (e.g., `db migrate`, `db seed`) rather than prefixing command names manually.
