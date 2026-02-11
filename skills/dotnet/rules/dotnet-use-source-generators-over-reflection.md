---
title: "Use source generators over reflection"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Use source generators over reflection

Use source generators over reflection: where available (Mapperly, System.Text.Json source gen, Roslyn analyzers). Source generators run at compile time, eliminate reflection costs, and are compatible with Native AOT.
