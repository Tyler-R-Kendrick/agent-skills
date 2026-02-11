---
title: "Monitor the `ProviderError` and `ProviderStale` events to..."
impact: MEDIUM
impactDescription: "general best practice"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Monitor the `ProviderError` and `ProviderStale` events to...

Monitor the `ProviderError` and `ProviderStale` events to detect connectivity issues with the backing flag service and fall back gracefully to cached or default values.
