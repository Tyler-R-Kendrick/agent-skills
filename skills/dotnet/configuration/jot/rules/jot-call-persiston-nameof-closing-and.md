---
title: "Call `.PersistOn(nameof(Closing))` and `"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Call `.PersistOn(nameof(Closing))` and `

Call `.PersistOn(nameof(Closing))` and `.StopTrackingOn(nameof(Closing))` for windows to ensure state is saved exactly once when the window closes.
