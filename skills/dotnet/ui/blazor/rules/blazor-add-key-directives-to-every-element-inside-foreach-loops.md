---
title: "Add `@key` directives to every element inside `@foreach` loops"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Add `@key` directives to every element inside `@foreach` loops

Add `@key` directives to every element inside `@foreach` loops: using a stable unique identifier (such as a database ID), not the loop index; without `@key`, Blazor's diffing algorithm reuses DOM elements incorrectly when items are inserted, removed, or reordered.
