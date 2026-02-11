---
title: "Configure `DataGridColumn.Field` using `nameof()` expressions"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Configure `DataGridColumn.Field` using `nameof()` expressions

Configure `DataGridColumn.Field` using `nameof()` expressions: instead of magic strings, so that property renames are caught at compile time; if the model property is renamed but the Field string is not updated, the column silently renders empty.
