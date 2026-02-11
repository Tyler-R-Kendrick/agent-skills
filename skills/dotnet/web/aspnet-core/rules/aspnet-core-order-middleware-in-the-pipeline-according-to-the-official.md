---
title: "Order middleware in the pipeline according to the official ASP.NET Core documentation"
impact: MEDIUM
impactDescription: "general best practice"
tags: aspnet-core, dotnet, web, building-web-apis, web-applications, and-microservices-with-aspnet-core-use-for-minimal-apis
---

## Order middleware in the pipeline according to the official ASP.NET Core documentation

(ExceptionHandler, HSTS, HttpsRedirection, StaticFiles, Routing, CORS, Authentication, Authorization, custom middleware, endpoints), because middleware executes in registration order and misordering causes authentication to be skipped or CORS headers to be missing.
