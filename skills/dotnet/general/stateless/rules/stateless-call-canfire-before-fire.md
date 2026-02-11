---
title: "Call `CanFire` before `Fire`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Call `CanFire` before `Fire`

Call `CanFire` before `Fire`: in UI-driven scenarios to enable/disable buttons based on valid transitions, preventing `InvalidOperationException`.
