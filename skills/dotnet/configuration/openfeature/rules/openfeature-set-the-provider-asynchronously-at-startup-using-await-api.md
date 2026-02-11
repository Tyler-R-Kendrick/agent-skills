---
title: "Set the provider asynchronously at startup using `await Api"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Set the provider asynchronously at startup using `await Api

Set the provider asynchronously at startup using `await Api.Instance.SetProviderAsync(provider)` and wait for the `ProviderReady` event before serving traffic to avoid evaluating against stale defaults.
