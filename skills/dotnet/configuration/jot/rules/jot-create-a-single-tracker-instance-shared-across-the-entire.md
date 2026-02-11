---
title: "Create a single `Tracker` instance shared across the entire..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Create a single `Tracker` instance shared across the entire...

Create a single `Tracker` instance shared across the entire application and register it as a singleton in your DI container to avoid conflicting file writes.
