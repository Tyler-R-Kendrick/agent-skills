---
title: "Define all events with `CorrelateById` or `CorrelateBy`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: automatonymous, dotnet, eventing, state-machine-definitions, masstransit-saga-orchestration, orderworkflow-lifecycle-management
---

## Define all events with `CorrelateById` or `CorrelateBy`...

Define all events with `CorrelateById` or `CorrelateBy` expressions so MassTransit can route messages to the correct saga instance reliably.
