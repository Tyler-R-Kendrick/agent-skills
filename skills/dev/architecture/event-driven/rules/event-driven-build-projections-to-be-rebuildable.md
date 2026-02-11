---
title: "Build projections to be rebuildable"
impact: MEDIUM
impactDescription: "general best practice"
tags: event-driven, dev, architecture, event-driven-architecture, event-sourcing, cqrs
---

## Build projections to be rebuildable

Build projections to be rebuildable: if a projection is corrupted or needs to change, replay events from the beginning.
