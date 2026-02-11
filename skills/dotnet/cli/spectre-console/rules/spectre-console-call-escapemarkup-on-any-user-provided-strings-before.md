---
title: "Call `.EscapeMarkup()` on any user-provided strings before..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Call `.EscapeMarkup()` on any user-provided strings before...

Call `.EscapeMarkup()` on any user-provided strings before interpolating them into markup templates to prevent markup injection (e.g., user input containing `[red]` would break rendering).
