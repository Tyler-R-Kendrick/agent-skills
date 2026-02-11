---
title: "Use `CancellationToken` everywhere"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Use `CancellationToken` everywhere

Use `CancellationToken` everywhere: pass it through all async call chains so requests can be cancelled cleanly when clients disconnect: ```csharp app.MapGet("/orders/{id}", async (Guid id, IOrderRepository repo, CancellationToken ct) => await repo.FindAsync(id, ct) is { } order ? Results.Ok(order) : Results.NotFound()); ```
