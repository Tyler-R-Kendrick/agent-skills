---
title: "Test state persistence by verifying that property values..."
impact: MEDIUM
impactDescription: "general best practice"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Test state persistence by verifying that property values...

Test state persistence by verifying that property values survive an application restart, using integration tests that create a tracker, set values, dispose, and re-create.
