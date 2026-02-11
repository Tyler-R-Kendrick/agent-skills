---
title: "Use `DxGrid` virtual scrolling mode (`VirtualScrollingEnabled=\"true\"`) for datasets exceeding 500 rows"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Use `DxGrid` virtual scrolling mode (`VirtualScrollingEnabled="true"`) for datasets exceeding 500 rows

Use `DxGrid` virtual scrolling mode (`VirtualScrollingEnabled="true"`) for datasets exceeding 500 rows: and bind to `IQueryable<T>` instead of `List<T>` so the grid translates sort/filter operations into LINQ expressions that execute server-side, avoiding loading the entire dataset into memory.
