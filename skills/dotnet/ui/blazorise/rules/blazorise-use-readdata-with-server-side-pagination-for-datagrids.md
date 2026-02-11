---
title: "Use `ReadData` with server-side pagination for DataGrids bound to more than 100 rows"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Use `ReadData` with server-side pagination for DataGrids bound to more than 100 rows

Use `ReadData` with server-side pagination for DataGrids bound to more than 100 rows: instead of loading the entire dataset into `Data`; client-side sorting/filtering on large datasets blocks the UI thread and causes noticeable lag on Blazor Server circuits.
