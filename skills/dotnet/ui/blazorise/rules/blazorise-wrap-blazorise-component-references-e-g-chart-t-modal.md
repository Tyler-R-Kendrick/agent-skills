---
title: "Wrap Blazorise component references (e.g., `Chart<T>`, `Modal`, `Validations`) in null-forgiving assignments (`= null!`)"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Wrap Blazorise component references (e.g., `Chart<T>`, `Modal`, `Validations`) in null-forgiving assignments (`= null!`)

Wrap Blazorise component references (e.g., `Chart<T>`, `Modal`, `Validations`) in null-forgiving assignments (`= null!`): with the understanding they are populated after `OnAfterRenderAsync`; accessing them in `OnInitializedAsync` before render will throw `NullReferenceException`.
