---
title: "Pin the Blazorise NuGet package version across all `Blazorise.*` packages using central package management"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazorise, dotnet, ui, building-blazor-applications-with-a-rich-component-library-that-abstracts-over-css-frameworks-like-bootstrap, bulma, material
---

## Pin the Blazorise NuGet package version across all `Blazorise.*` packages using central package management

Pin the Blazorise NuGet package version across all `Blazorise.*` packages using central package management: because Blazorise components share internal contracts versioned together; a mismatch between `Blazorise` 1.6.0 and `Blazorise.Bootstrap5` 1.5.2 causes `MissingMethodException` at runtime.
