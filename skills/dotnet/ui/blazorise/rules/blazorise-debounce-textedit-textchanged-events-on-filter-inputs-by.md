---
title: "Debounce `TextEdit.TextChanged` events on filter inputs by using `Blazorise.DataGrid.FilterTemplate` with an explicit `Timer`-based delay of 300ms"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Debounce `TextEdit.TextChanged` events on filter inputs by using `Blazorise.DataGrid.FilterTemplate` with an explicit `Timer`-based delay of 300ms

Debounce `TextEdit.TextChanged` events on filter inputs by using `Blazorise.DataGrid.FilterTemplate` with an explicit `Timer`-based delay of 300ms: before calling `TriggerFilterChange`, avoiding a new server-side query on every keystroke.
