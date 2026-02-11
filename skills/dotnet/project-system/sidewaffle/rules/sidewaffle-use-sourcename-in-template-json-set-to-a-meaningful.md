---
title: "Use `sourceName` in `template.json` set to a meaningful placeholder name"
impact: MEDIUM
impactDescription: "general best practice"
tags: sidewaffle, dotnet, project-system, creating, packaging, and-distributing-custom-dotnet-new-project-and-item-templates-using-the-template-engine
---

## Use `sourceName` in `template.json` set to a meaningful placeholder name

(e.g., `MyService`) that appears in all namespaces, filenames, and `.csproj` references so that `dotnet new -n ActualName` performs a complete rename across all files.
