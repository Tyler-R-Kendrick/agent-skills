---
title: "Reserve `AppContext` switches for binary compatibility..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Reserve `AppContext` switches for binary compatibility...

Reserve `AppContext` switches for binary compatibility decisions; do not use them for user-facing feature flags, A/B testing, or configuration that varies per environment.
