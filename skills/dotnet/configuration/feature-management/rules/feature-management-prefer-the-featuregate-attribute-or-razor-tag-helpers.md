---
title: "Prefer the `[FeatureGate]` attribute or Razor tag helpers..."
impact: LOW
impactDescription: "recommended but situational"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Prefer the `[FeatureGate]` attribute or Razor tag helpers...

Prefer the `[FeatureGate]` attribute or Razor tag helpers over manual `if/else` checks in controllers and views to keep feature gating declarative and centralized.
