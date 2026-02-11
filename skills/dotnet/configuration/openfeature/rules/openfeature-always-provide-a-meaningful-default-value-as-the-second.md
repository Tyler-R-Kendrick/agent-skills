---
title: "Always provide a meaningful default value as the second..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Always provide a meaningful default value as the second...

Always provide a meaningful default value as the second argument to every evaluation call so the application behaves correctly if the provider is unavailable or the flag is missing.
