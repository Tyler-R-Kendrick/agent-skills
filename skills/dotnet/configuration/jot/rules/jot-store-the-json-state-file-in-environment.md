---
title: "Store the JSON state file in `Environment"
impact: MEDIUM
impactDescription: "general best practice"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Store the JSON state file in `Environment

Store the JSON state file in `Environment.SpecialFolder.ApplicationData` rather than the application directory so that state persists across updates and respects user permissions.
