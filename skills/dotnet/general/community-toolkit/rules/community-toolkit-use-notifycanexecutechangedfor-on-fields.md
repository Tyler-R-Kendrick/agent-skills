---
title: "Use `[NotifyCanExecuteChangedFor]` on fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: community-toolkit, dotnet, general, mvvm-source-generated-view-models, observable-properties, relay-commands
---

## Use `[NotifyCanExecuteChangedFor]` on fields

Use `[NotifyCanExecuteChangedFor]` on fields: that affect command availability so the UI automatically re-evaluates `CanExecute` when those fields change.
