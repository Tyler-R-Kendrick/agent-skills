---
title: "Pass `SemVer` to MSBuild's `Version` property and `NuGetVersionV2` to `PackageVersion`"
impact: MEDIUM
impactDescription: "general best practice"
tags: gitversion, dotnet, project-system, deriving-semantic-version-numbers-from-git-history, branch-names, tags
---

## Pass `SemVer` to MSBuild's `Version` property and `NuGetVersionV2` to `PackageVersion`

Pass `SemVer` to MSBuild's `Version` property and `NuGetVersionV2` to `PackageVersion`: because NuGet has specific pre-release label rules (no dots in some contexts) and `NuGetVersionV2` handles those constraints.
