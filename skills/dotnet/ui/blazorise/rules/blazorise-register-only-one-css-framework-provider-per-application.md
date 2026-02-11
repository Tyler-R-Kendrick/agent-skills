---
title: "Register only one CSS framework provider per application"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Register only one CSS framework provider per application

(e.g., `AddBootstrap5Providers()`) because Blazorise generates CSS class names from the active provider at runtime; mixing providers causes class conflicts and unpredictable visual rendering.
