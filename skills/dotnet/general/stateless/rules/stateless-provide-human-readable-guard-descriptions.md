---
title: "Provide human-readable guard descriptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Provide human-readable guard descriptions

Provide human-readable guard descriptions: as the last parameter to `PermitIf` so that `GetPermittedTriggers` and diagram exports show why a transition is blocked.
