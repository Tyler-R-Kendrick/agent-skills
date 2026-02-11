---
title: "Wrap `IJSRuntime.InvokeAsync` calls in `OnAfterRenderAsync` guarded by `firstRender`"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Wrap `IJSRuntime.InvokeAsync` calls in `OnAfterRenderAsync` guarded by `firstRender`

Wrap `IJSRuntime.InvokeAsync` calls in `OnAfterRenderAsync` guarded by `firstRender`: for DOM-dependent initialization (e.g., chart libraries, focus management); calling JS interop during `OnInitializedAsync` will throw during server-side prerendering because no DOM exists yet.
