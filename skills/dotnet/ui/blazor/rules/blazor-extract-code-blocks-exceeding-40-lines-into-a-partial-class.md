---
title: "Extract `@code` blocks exceeding 40 lines into a partial class code-behind file"
impact: MEDIUM
impactDescription: "general best practice"
tags: blazor, dotnet, ui, building-interactive-web-uis-with-c-and-razor-components-using-blazor-server, blazor-webassembly, or-blazor-united-ssr--interactivity-use-when-building-spas
---

## Extract `@code` blocks exceeding 40 lines into a partial class code-behind file

(e.g., `MyComponent.razor.cs`) to keep markup readable, enable better IntelliSense, and allow the C# code to be unit-tested without Razor compilation.
