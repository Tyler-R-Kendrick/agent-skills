---
title: "Use `DxGridDataColumn.DisplayFormat` with .NET format strings (e.g., `\"C2\"`, `\"N0\"`, `\"d\"`) on numeric and date columns"
impact: MEDIUM
impactDescription: "general best practice"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Use `DxGridDataColumn.DisplayFormat` with .NET format strings (e.g., `"C2"`, `"N0"`, `"d"`) on numeric and date columns

Use `DxGridDataColumn.DisplayFormat` with .NET format strings (e.g., `"C2"`, `"N0"`, `"d"`) on numeric and date columns: instead of formatting in `DisplayTemplate`, because `DisplayFormat` is used by the grid's built-in export, summary, and clipboard operations.
