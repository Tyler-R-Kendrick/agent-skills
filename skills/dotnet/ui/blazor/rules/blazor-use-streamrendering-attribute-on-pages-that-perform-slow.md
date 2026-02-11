---
title: "Use `StreamRendering` attribute on pages that perform slow data fetches"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Use `StreamRendering` attribute on pages that perform slow data fetches

Use `StreamRendering` attribute on pages that perform slow data fetches: so the initial HTML shell renders immediately with a loading placeholder and the content streams in as the async operation completes, improving perceived performance without requiring interactive mode.
