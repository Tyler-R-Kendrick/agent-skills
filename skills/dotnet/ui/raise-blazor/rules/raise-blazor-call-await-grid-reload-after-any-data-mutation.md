---
title: "Call `await _grid.Reload()` after any data mutation"
impact: MEDIUM
impactDescription: "general best practice"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Call `await _grid.Reload()` after any data mutation

(create, update, delete) that affects the DataGrid's server-side source, rather than manually manipulating the bound collection; `Reload` re-invokes `LoadData` with the current filter, sort, and page state, ensuring count and pagination remain accurate.
