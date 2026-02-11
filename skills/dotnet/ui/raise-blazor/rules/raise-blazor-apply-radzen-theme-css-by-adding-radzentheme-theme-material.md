---
title: "Apply Radzen theme CSS by adding `<RadzenTheme Theme=\"material\" @rendermode=\"InteractiveServer\" />` in `App.razor`"
impact: MEDIUM
impactDescription: "general best practice"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Apply Radzen theme CSS by adding `<RadzenTheme Theme="material" @rendermode="InteractiveServer" />` in `App.razor`

Apply Radzen theme CSS by adding `<RadzenTheme Theme="material" @rendermode="InteractiveServer" />` in `App.razor`: rather than linking individual CSS files manually; the `RadzenTheme` component manages dark mode toggling, CSS variable scoping, and runtime theme switching.
