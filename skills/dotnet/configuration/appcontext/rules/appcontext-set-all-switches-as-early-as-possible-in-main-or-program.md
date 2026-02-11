---
title: "Set all switches as early as possible in `Main` or `Program"
impact: MEDIUM
impactDescription: "general best practice"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Set all switches as early as possible in `Main` or `Program

Set all switches as early as possible in `Main` or `Program.cs` before any dependent code executes, because reads may be cached by the consuming component.
