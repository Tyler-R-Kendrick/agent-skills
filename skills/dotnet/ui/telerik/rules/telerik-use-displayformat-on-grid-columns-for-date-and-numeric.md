---
title: "Use `DisplayFormat` on grid columns for date and numeric formatting"
impact: MEDIUM
impactDescription: "general best practice"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Use `DisplayFormat` on grid columns for date and numeric formatting

(e.g., `"{0:C2}"`, `"{0:yyyy-MM-dd}"`) rather than a `<Template>` with `ToString()`, because `DisplayFormat` is applied in export, group headers, and aggregate footers.
