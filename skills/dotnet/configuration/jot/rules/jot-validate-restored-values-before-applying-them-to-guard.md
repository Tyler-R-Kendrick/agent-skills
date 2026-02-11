---
title: "Validate restored values before applying them to guard..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Validate restored values before applying them to guard...

Validate restored values before applying them to guard against corrupted state files; for example, clamp window coordinates to ensure they fall within current screen bounds.
