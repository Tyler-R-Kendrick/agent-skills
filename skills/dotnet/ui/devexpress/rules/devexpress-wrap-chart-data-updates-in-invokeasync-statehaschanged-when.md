---
title: "Wrap chart data updates in `InvokeAsync(StateHasChanged)` when data arrives from background services or SignalR hubs"
impact: MEDIUM
impactDescription: "general best practice"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Wrap chart data updates in `InvokeAsync(StateHasChanged)` when data arrives from background services or SignalR hubs

Wrap chart data updates in `InvokeAsync(StateHasChanged)` when data arrives from background services or SignalR hubs: because `DxChart` relies on Blazor's render cycle to detect changes; mutating the data list without triggering a render produces stale visuals.
