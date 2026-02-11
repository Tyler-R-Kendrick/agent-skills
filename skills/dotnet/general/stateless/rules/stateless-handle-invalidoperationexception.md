---
title: "Handle `InvalidOperationException`"
impact: MEDIUM
impactDescription: "general best practice"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Handle `InvalidOperationException`

Handle `InvalidOperationException`: from invalid transitions gracefully by logging the current state and attempted trigger rather than letting the exception propagate unhandled.
