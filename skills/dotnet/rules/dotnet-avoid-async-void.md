---
title: "Avoid `async void`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Avoid `async void`

Avoid `async void`: it swallows exceptions. Always return `Task` or `ValueTask` from async methods. The only exception is event handlers.
