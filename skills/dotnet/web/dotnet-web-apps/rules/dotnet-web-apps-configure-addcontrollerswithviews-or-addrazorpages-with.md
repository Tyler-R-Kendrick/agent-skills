---
title: "Configure `AddControllersWithViews()` or `AddRazorPages()` with `AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Configure `AddControllersWithViews()` or `AddRazorPages()` with `AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)`

Configure `AddControllersWithViews()` or `AddRazorPages()` with `AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)`: to ensure JSON responses use camelCase property names, matching JavaScript conventions and preventing front-end mapping errors.
