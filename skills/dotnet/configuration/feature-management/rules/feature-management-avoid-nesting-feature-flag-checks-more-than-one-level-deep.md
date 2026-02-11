---
title: "Avoid nesting feature flag checks more than one level deep;..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Avoid nesting feature flag checks more than one level deep;...

Avoid nesting feature flag checks more than one level deep; refactor deeply nested flag logic into separate strategy classes selected by a single flag evaluation.
