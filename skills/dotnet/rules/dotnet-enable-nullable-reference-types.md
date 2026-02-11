---
title: "Enable nullable reference types"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Enable nullable reference types

(`<Nullable>enable</Nullable>`) in every project. This catches null-reference bugs at compile time: ```xml <PropertyGroup> <TargetFramework>net8.0</TargetFramework> <Nullable>enable</Nullable> <ImplicitUsings>enable</ImplicitUsings> </PropertyGroup> ```
