---
title: "Avoid reading a switch value on every method call in a hot..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Avoid reading a switch value on every method call in a hot...

Avoid reading a switch value on every method call in a hot path; instead, read it once during construction and store the result in a field.
