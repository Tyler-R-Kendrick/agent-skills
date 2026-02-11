---
title: "Compose content types from small, reusable content parts"
impact: MEDIUM
impactDescription: "general best practice"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Compose content types from small, reusable content parts

(`TitlePart`, `AutoroutePart`, `MarkdownBodyPart`, custom parts) rather than creating monolithic content types with many fields directly on the type, enabling part reuse across multiple content types and keeping each part's handler focused.
