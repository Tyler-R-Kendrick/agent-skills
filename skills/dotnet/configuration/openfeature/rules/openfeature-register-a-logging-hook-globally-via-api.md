---
title: "Register a logging hook globally via `Api"
impact: MEDIUM
impactDescription: "general best practice"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Register a logging hook globally via `Api

Register a logging hook globally via `Api.Instance.AddHooks` to capture flag evaluation details at `Debug` level for diagnosing targeting issues without modifying business logic.
