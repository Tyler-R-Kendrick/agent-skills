---
title: "Use the `OnRead` event with `DataSourceRequest` for all grid data operations"
impact: MEDIUM
impactDescription: "general best practice"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Use the `OnRead` event with `DataSourceRequest` for all grid data operations

Use the `OnRead` event with `DataSourceRequest` for all grid data operations: instead of binding a `List<T>` to the `Data` parameter, because `OnRead` passes sorting, filtering, paging, and grouping descriptors that can be translated server-side using `Telerik.DataSource.Extensions.ToDataSourceResult()` on an `IQueryable<T>`.
