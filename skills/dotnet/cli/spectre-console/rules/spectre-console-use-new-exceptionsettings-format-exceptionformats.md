---
title: "Use `new ExceptionSettings { Format = ExceptionFormats"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Use `new ExceptionSettings { Format = ExceptionFormats

Use `new ExceptionSettings { Format = ExceptionFormats.ShortenEverything }` when displaying exceptions to users to reduce noise, and include `ExceptionFormats.ShowLinks` in development to get clickable file paths in supported terminals.
