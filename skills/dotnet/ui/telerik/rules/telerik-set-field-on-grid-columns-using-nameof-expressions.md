---
title: "Set `Field` on grid columns using `nameof()` expressions"
impact: MEDIUM
impactDescription: "general best practice"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Set `Field` on grid columns using `nameof()` expressions

(e.g., `Field="@nameof(Product.Name)"`) instead of hardcoded strings, so that property renames on the model class produce compile-time errors rather than silently rendering empty cells.
