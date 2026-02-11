---
title: "Define feature flag names as constants in a static class (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Define feature flag names as constants in a static class (e

Define feature flag names as constants in a static class (e.g., `FeatureFlags.NewDashboard`) and reference them everywhere instead of using magic strings.
