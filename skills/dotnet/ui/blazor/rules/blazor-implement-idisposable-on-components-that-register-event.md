---
title: "Implement `IDisposable` on components that register event handlers, timers, or JS interop callbacks"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Implement `IDisposable` on components that register event handlers, timers, or JS interop callbacks

Implement `IDisposable` on components that register event handlers, timers, or JS interop callbacks: and unsubscribe in `Dispose()`; Blazor Server circuits can leak memory for each connected user if handlers accumulate over the circuit lifetime.
