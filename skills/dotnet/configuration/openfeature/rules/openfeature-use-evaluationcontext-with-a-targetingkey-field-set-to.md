---
title: "Use `EvaluationContext` with a `targetingKey` field set to..."
impact: MEDIUM
impactDescription: "general best practice"
tags: openfeature, dotnet, configuration, vendor-neutral-feature-flag-evaluation, switching-between-flag-providers-launchdarkly, flagsmith
---

## Use `EvaluationContext` with a `targetingKey` field set to...

Use `EvaluationContext` with a `targetingKey` field set to the user identifier on every evaluation call to enable per-user targeting and consistent percentage-based rollouts.
