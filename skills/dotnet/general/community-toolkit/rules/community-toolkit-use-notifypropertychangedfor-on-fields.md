---
title: "Use `[NotifyPropertyChangedFor]` on fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: community-toolkit, dotnet, general, mvvm-source-generated-view-models, observable-properties, relay-commands
---

## Use `[NotifyPropertyChangedFor]` on fields

Use `[NotifyPropertyChangedFor]` on fields: to trigger dependent property change notifications (e.g., a `FullName` computed from `FirstName` and `LastName`).
