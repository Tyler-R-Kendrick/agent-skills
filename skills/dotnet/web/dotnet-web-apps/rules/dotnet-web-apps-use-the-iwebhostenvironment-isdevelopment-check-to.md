---
title: "Use the `IWebHostEnvironment.IsDevelopment()` check to conditionally enable Swagger, detailed error pages, and developer exception page"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: dotnet-web-apps, dotnet, web, choosing-between-and-implementing-net-web-application-patterns-including-mvc, razor-pages, minimal-apis
---

## Use the `IWebHostEnvironment.IsDevelopment()` check to conditionally enable Swagger, detailed error pages, and developer exception page

Use the `IWebHostEnvironment.IsDevelopment()` check to conditionally enable Swagger, detailed error pages, and developer exception page: so that sensitive diagnostic information is never exposed in production; `app.UseDeveloperExceptionPage()` leaks stack traces and connection strings.
