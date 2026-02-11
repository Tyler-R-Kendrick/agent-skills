---
title: "Set `PackageType` to `Template` in the packaging `.csproj`"
impact: MEDIUM
impactDescription: "general best practice"
tags: sidewaffle, dotnet, project-system, creating, packaging, and-distributing-custom-dotnet-new-project-and-item-templates-using-the-template-engine
---

## Set `PackageType` to `Template` in the packaging `.csproj`

Set `PackageType` to `Template` in the packaging `.csproj`: so that NuGet.org and `dotnet new` recognize the package as a template pack rather than a library dependency.
