---
title: "Organize minimal API endpoints into static extension methods"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Organize minimal API endpoints into static extension methods

(e.g., `MapOrderEndpoints()`, `MapUserEndpoints()`) in separate files under an `Endpoints/` folder, rather than defining all routes in `Program.cs`, to keep the startup file under 50 lines and make each endpoint group independently navigable.
