---
title: "Use `FireAsync` and `OnEntryAsync`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Use `FireAsync` and `OnEntryAsync`

Use `FireAsync` and `OnEntryAsync`: when entry/exit actions involve I/O operations (database, HTTP calls) to avoid blocking threads.
