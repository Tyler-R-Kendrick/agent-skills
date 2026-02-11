---
title: "Only create `"
impact: LOW
impactDescription: "recommended but situational"
tags: msbuild-csproj, dotnet, project-system
---

## Only create `

Only create `.csproj` files for projects that cannot run as a single-file executable due to file references (for example, content files, shared source files, or other non-package inputs). If a project only needs package references, prefer a single-file app instead.
