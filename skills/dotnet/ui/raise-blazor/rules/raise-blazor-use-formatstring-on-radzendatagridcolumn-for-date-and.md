---
title: "Use `FormatString` on `RadzenDataGridColumn` for date and numeric formatting"
impact: MEDIUM
impactDescription: "general best practice"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Use `FormatString` on `RadzenDataGridColumn` for date and numeric formatting

(e.g., `"{0:C2}"`, `"{0:d}"`) instead of a `<Template>` with inline formatting, because `FormatString` is applied consistently in export, clipboard copy, and print operations.
