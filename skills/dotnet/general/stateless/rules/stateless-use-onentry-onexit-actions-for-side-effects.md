---
title: "Use `OnEntry`/`OnExit` actions for side effects"
impact: MEDIUM
impactDescription: "general best practice"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Use `OnEntry`/`OnExit` actions for side effects

(logging, notifications, database updates) rather than placing them in the code that calls `Fire`.
