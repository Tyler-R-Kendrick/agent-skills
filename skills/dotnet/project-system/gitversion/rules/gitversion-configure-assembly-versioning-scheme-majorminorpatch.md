---
title: "Configure `assembly-versioning-scheme: MajorMinorPatch` explicitly"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: gitversion, dotnet, project-system, deriving-semantic-version-numbers-from-git-history, branch-names, tags
---

## Configure `assembly-versioning-scheme: MajorMinorPatch` explicitly

Configure `assembly-versioning-scheme: MajorMinorPatch` explicitly: rather than relying on defaults to ensure the `AssemblyVersion` attribute contains the full three-part version and not just `Major.0.0.0`.
