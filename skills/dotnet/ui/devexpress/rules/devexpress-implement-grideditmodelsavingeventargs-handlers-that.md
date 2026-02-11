---
title: "Implement `GridEditModelSavingEventArgs` handlers that validate the `EditModel` and set `e.Cancel = true` on validation failure"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Implement `GridEditModelSavingEventArgs` handlers that validate the `EditModel` and set `e.Cancel = true` on validation failure

Implement `GridEditModelSavingEventArgs` handlers that validate the `EditModel` and set `e.Cancel = true` on validation failure: with a user-visible notification, rather than silently ignoring invalid edits; the grid closes the edit row regardless unless `Cancel` is explicitly set.
