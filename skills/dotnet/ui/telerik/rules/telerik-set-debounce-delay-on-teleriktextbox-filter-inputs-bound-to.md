---
title: "Set `Debounce` delay on `TelerikTextBox` filter inputs bound to grid `FilterCellTemplate`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Set `Debounce` delay on `TelerikTextBox` filter inputs bound to grid `FilterCellTemplate`

(e.g., `DebounceDelay="300"`) to avoid triggering a server-side `OnRead` call on every keystroke; without debouncing, rapid typing causes a flood of concurrent `OnRead` invocations that degrade Blazor Server circuit responsiveness.
