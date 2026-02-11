---
title: "Define diagnostic IDs with a consistent prefix (e.g., `MA001`) and maintain a public constants class"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Define diagnostic IDs with a consistent prefix (e.g., `MA001`) and maintain a public constants class

Define diagnostic IDs with a consistent prefix (e.g., `MA001`) and maintain a public constants class: so that consumers can reference diagnostic IDs in `.editorconfig` severity overrides and `SuppressMessage` attributes.
