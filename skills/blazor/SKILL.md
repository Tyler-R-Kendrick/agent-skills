---
name: blazor
description: Guidance for Blazor usage. Use when working with blazor.
license: MIT
metadata:
  displayName: "Blazor"
  author: "Tyler-R-Kendrick"
---

# Blazor

## Overview
Use Blazor for interactive web UI with C# and components.

## Example
```csharp
builder.Services.AddRazorComponents()
	.AddInteractiveServerComponents();
```

## Guidance
- Keep components small and reuse shared UI logic.
- Use `@key` and async patterns to avoid rendering glitches.