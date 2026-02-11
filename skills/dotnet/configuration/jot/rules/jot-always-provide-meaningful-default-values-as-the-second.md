---
title: "Always provide meaningful default values as the second..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Always provide meaningful default values as the second...

Always provide meaningful default values as the second argument to `.Property()` so that first-run experiences are well-defined without requiring an existing state file.
