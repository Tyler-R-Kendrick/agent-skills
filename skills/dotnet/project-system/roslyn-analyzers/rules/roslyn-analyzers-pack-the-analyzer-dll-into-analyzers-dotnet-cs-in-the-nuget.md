---
title: "Pack the analyzer DLL into `analyzers/dotnet/cs` in the NuGet package"
impact: MEDIUM
impactDescription: "general best practice"
tags: roslyn-analyzers, dotnet, project-system, writing-custom-roslyn-diagnostic-analyzers-and-code-fix-providers-that-report-warnings-and-errors-during-compilation, and-optionally-provide-automated-code-transformations
---

## Pack the analyzer DLL into `analyzers/dotnet/cs` in the NuGet package

Pack the analyzer DLL into `analyzers/dotnet/cs` in the NuGet package: using the `None` item with `PackagePath` so that consuming projects automatically load the analyzer without explicit project references.
