---
title: "Update `Chart` data using `AddLabelsDatasetsAndUpdate` or `SetLabelsDatasetsAndUpdate` methods"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Update `Chart` data using `AddLabelsDatasetsAndUpdate` or `SetLabelsDatasetsAndUpdate` methods

Update `Chart` data using `AddLabelsDatasetsAndUpdate` or `SetLabelsDatasetsAndUpdate` methods: instead of replacing the `Data` property and calling `Refresh()`, because the method-based API performs incremental Chart.js updates with animations rather than destroying and recreating the canvas.
