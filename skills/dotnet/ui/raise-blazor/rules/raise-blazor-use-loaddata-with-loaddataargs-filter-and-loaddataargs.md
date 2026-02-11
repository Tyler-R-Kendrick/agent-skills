---
title: "Use `LoadData` with `LoadDataArgs.Filter` and `LoadDataArgs.OrderBy` for all DataGrids displaying server-sourced data"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Use `LoadData` with `LoadDataArgs.Filter` and `LoadDataArgs.OrderBy` for all DataGrids displaying server-sourced data

Use `LoadData` with `LoadDataArgs.Filter` and `LoadDataArgs.OrderBy` for all DataGrids displaying server-sourced data: and translate the OData-style filter string to your data layer using `System.Linq.Dynamic.Core`, avoiding loading the full dataset into memory just to support client-side filtering.
