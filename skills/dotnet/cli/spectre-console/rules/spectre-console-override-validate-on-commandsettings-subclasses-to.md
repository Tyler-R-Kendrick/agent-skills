---
title: "Override `Validate()` on `CommandSettings` subclasses to..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: spectre-console, dotnet, cli, rendering-tables-and-grids-in-the-terminal, progress-bars-and-spinners, interactive-prompts-and-selections
---

## Override `Validate()` on `CommandSettings` subclasses to...

Override `Validate()` on `CommandSettings` subclasses to enforce business rules (e.g., environment must be one of development/staging/production) with clear error messages before command execution.
