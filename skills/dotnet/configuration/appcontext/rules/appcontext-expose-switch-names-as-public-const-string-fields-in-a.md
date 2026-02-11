---
title: "Expose switch names as `public const string` fields in a..."
impact: MEDIUM
impactDescription: "general best practice"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Expose switch names as `public const string` fields in a...

Expose switch names as `public const string` fields in a dedicated static class rather than scattering magic strings throughout the codebase.
