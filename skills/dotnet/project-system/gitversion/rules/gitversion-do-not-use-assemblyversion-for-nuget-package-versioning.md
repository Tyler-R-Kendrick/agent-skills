---
title: "Do not use `AssemblyVersion` for NuGet package versioning"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: gitversion, dotnet, project-system, deriving-semantic-version-numbers-from-git-history, branch-names, tags
---

## Do not use `AssemblyVersion` for NuGet package versioning

Do not use `AssemblyVersion` for NuGet package versioning: because `AssemblyVersion` changes break binding redirects; use `AssemblyFileVersion` and `InformationalVersion` for the full SemVer string.
