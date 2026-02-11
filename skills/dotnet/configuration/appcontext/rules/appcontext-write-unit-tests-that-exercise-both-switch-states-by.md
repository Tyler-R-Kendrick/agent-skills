---
title: "Write unit tests that exercise both switch states by..."
impact: MEDIUM
impactDescription: "general best practice"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Write unit tests that exercise both switch states by...

Write unit tests that exercise both switch states by calling `AppContext.SetSwitch` in test setup and verifying the two code paths produce correct results.
