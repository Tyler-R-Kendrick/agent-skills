---
title: "Use C-style preprocessor directives (`//#if`, `//#endif`) for conditional C# content"
impact: MEDIUM
impactDescription: "general best practice"
tags: sidewaffle, dotnet, project-system, creating, packaging, and-distributing-custom-dotnet-new-project-and-item-templates-using-the-template-engine
---

## Use C-style preprocessor directives (`//#if`, `//#endif`) for conditional C# content

Use C-style preprocessor directives (`//#if`, `//#endif`) for conditional C# content: rather than omitting entire files, because partial file content control provides finer granularity and keeps the template structure consistent across configurations.
