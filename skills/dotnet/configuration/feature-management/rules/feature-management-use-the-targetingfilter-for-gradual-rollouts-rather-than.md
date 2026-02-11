---
title: "Use the `TargetingFilter` for gradual rollouts rather than..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Use the `TargetingFilter` for gradual rollouts rather than...

Use the `TargetingFilter` for gradual rollouts rather than the `Percentage` filter when you need consistent per-user evaluation (same user always gets the same result).
