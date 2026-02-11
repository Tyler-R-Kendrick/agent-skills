---
title: "Use `CascadingValue` with `IsFixed=\"true\"` for values that never change"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Use `CascadingValue` with `IsFixed="true"` for values that never change

(such as theme configuration or feature flags) so that Blazor skips change-detection on every render cycle for all descendant components that consume the value.
