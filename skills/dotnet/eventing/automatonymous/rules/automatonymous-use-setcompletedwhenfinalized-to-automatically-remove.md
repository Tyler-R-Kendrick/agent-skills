---
title: "Use `SetCompletedWhenFinalized()` to automatically remove..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: automatonymous, dotnet, eventing, state-machine-definitions, masstransit-saga-orchestration, orderworkflow-lifecycle-management
---

## Use `SetCompletedWhenFinalized()` to automatically remove...

Use `SetCompletedWhenFinalized()` to automatically remove completed saga instances from the persistence store and prevent state table bloat.
