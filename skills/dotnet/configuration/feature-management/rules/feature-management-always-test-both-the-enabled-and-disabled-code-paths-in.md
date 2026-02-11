---
title: "Always test both the enabled and disabled code paths in..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: feature-management, dotnet, configuration, configuration-driven-feature-flags, percentage-based-rollouts, time-windowed-features
---

## Always test both the enabled and disabled code paths in...

Always test both the enabled and disabled code paths in unit tests by mocking `IFeatureManager.IsEnabledAsync` to return `true` and `false` separately.
