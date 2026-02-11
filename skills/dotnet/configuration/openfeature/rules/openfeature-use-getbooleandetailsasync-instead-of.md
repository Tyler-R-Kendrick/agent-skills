---
title: "Use `GetBooleanDetailsAsync` instead of..."
impact: MEDIUM
impactDescription: "general best practice"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Use `GetBooleanDetailsAsync` instead of...

Use `GetBooleanDetailsAsync` instead of `GetBooleanValueAsync` when you need to log the reason, variant, and metadata alongside the flag value for audit or analytics.
