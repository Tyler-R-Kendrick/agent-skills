---
title: "Always provide a safe default when a switch is unset by..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Always provide a safe default when a switch is unset by...

Always provide a safe default when a switch is unset by treating `TryGetSwitch` returning `false` as the default behavior path.
