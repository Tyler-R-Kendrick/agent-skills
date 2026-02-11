---
title: "Keep provider initialization separate from flag evaluation;..."
impact: MEDIUM
impactDescription: "general best practice"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Keep provider initialization separate from flag evaluation;...

Keep provider initialization separate from flag evaluation; set up the provider in `Program.cs` and inject `FeatureClient` into services rather than accessing `Api.Instance` directly.
