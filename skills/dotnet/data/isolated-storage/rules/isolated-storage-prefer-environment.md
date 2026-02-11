---
title: "Prefer `Environment"
impact: LOW
impactDescription: "recommended but situational"
tags: isolated-storage, dotnet, data, per-user-or-per-assembly-sandboxed-file-storage-in-desktop-applications, small-settings-or-cache-data-scoped-to-user-identity, and-legacy-clickonce-or-partial-trust-application-scenarios
---

## Prefer `Environment

Prefer `Environment.SpecialFolder.ApplicationData` with explicit subdirectories over isolated storage in new .NET 6+ applications for better cross-platform compatibility and transparency.
