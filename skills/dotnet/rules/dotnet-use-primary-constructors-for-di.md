---
title: "Use primary constructors for DI"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Use primary constructors for DI

Use primary constructors for DI: in services and controllers (C# 12). This eliminates boilerplate `private readonly` fields while keeping constructor injection.
