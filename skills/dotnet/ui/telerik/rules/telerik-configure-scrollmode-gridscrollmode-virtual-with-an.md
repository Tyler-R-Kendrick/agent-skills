---
title: "Configure `ScrollMode=\"GridScrollMode.Virtual\"` with an explicit `RowHeight` for grids displaying more than 500 rows"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Configure `ScrollMode="GridScrollMode.Virtual"` with an explicit `RowHeight` for grids displaying more than 500 rows

, and ensure the `Height` property is set to a fixed pixel value; virtual scrolling requires a known row height to calculate the scrollbar position and only renders visible rows in the DOM.
