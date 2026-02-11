---
title: "Avoid calling `StateHasChanged()` inside `OnInitializedAsync` or `OnParametersSetAsync`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Avoid calling `StateHasChanged()` inside `OnInitializedAsync` or `OnParametersSetAsync`

Avoid calling `StateHasChanged()` inside `OnInitializedAsync` or `OnParametersSetAsync`: because Blazor automatically re-renders after these lifecycle methods complete; redundant calls double the render work and cause visible flicker on Server render mode.
