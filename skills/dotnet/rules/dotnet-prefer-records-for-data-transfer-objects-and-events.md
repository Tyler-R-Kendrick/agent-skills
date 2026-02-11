---
title: "Prefer records for data transfer objects and events"
impact: LOW
impactDescription: "recommended but situational"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Prefer records for data transfer objects and events

Records provide value equality, immutability, and concise syntax. Use `record class` for heap-allocated (default) and `record struct` for stack-allocated small types.
