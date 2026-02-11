---
title: "Register services with the correct lifetime"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Register services with the correct lifetime

`Singleton` for stateless/thread-safe services, `Scoped` for per-request state (EF DbContext), `Transient` for lightweight stateless operations. Never inject Scoped into Singleton.
