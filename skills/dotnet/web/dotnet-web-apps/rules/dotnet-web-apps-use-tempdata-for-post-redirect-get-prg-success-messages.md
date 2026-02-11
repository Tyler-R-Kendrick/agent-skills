---
title: "Use `TempData` for post-redirect-get (PRG) success messages"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Use `TempData` for post-redirect-get (PRG) success messages

Use `TempData` for post-redirect-get (PRG) success messages: in MVC and Razor Pages instead of passing messages via query strings or storing them in session, because `TempData` is automatically cleared after the next request and does not persist across browser refreshes.
