---
title: "Externalize state storage"
impact: MEDIUM
impactDescription: "general best practice"
tags: stateless, dotnet, general, modeling-state-transitions-with-guards-and-actions, workflow-engines, order-processing-pipelines
---

## Externalize state storage

Externalize state storage: by using the `StateMachine<TState, TTrigger>(stateAccessor, stateMutator)` constructor overload to persist state in a database or cache.
