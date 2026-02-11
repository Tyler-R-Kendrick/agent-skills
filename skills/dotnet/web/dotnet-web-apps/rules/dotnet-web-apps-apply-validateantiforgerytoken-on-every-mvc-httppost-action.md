---
title: "Apply `[ValidateAntiForgeryToken]` on every MVC `[HttpPost]` action and Razor Page `OnPost` handler"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Apply `[ValidateAntiForgeryToken]` on every MVC `[HttpPost]` action and Razor Page `OnPost` handler

Apply `[ValidateAntiForgeryToken]` on every MVC `[HttpPost]` action and Razor Page `OnPost` handler: that processes form submissions, and add `app.UseAntiforgery()` to the middleware pipeline, to prevent cross-site request forgery attacks on state-changing operations.
