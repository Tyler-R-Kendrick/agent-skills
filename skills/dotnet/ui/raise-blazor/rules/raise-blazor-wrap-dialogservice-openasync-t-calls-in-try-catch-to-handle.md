---
title: "Wrap `DialogService.OpenAsync<T>` calls in try-catch to handle `TaskCanceledException`"
impact: MEDIUM
impactDescription: "general best practice"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Wrap `DialogService.OpenAsync<T>` calls in try-catch to handle `TaskCanceledException`

Wrap `DialogService.OpenAsync<T>` calls in try-catch to handle `TaskCanceledException`: that fires when users close dialogs via the X button or overlay click, because unhandled cancellation propagates up and logs a noisy unobserved task exception in Blazor Server circuits.
