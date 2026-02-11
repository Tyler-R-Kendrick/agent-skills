---
title: "Use `RadzenTemplateForm<T>` with component-specific validators (`RadzenRequiredValidator`, `RadzenEmailValidator`)"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Use `RadzenTemplateForm<T>` with component-specific validators (`RadzenRequiredValidator`, `RadzenEmailValidator`)

Use `RadzenTemplateForm<T>` with component-specific validators (`RadzenRequiredValidator`, `RadzenEmailValidator`): rather than `EditForm` with `DataAnnotationsValidator`, because Radzen's validators render inline within `RadzenFormField` helper slots and integrate with the Radzen theme; mixing `EditForm` and Radzen components produces misaligned validation messages.
