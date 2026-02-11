---
title: "Prefer `runtimeconfig"
impact: LOW
impactDescription: "recommended but situational"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Prefer `runtimeconfig

Prefer `runtimeconfig.json` or MSBuild `RuntimeHostConfigurationOption` over `SetSwitch` in code when the switch needs to be controlled by operations teams without recompilation.
