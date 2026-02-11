---
title: "Structure solutions with clear project boundaries"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Structure solutions with clear project boundaries

Structure solutions with clear project boundaries: separate API host, domain logic, infrastructure, and tests into distinct projects. Use `<ProjectReference>` and enforce dependency direction (domain has no external references).
