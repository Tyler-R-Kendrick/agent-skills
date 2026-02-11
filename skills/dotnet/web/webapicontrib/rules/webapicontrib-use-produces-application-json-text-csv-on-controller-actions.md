---
title: "Use `[Produces(\"application/json\", \"text/csv\")]` on controller actions"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Use `[Produces("application/json", "text/csv")]` on controller actions

Use `[Produces("application/json", "text/csv")]` on controller actions: to document which content types each endpoint supports, so that OpenAPI/Swagger generation includes the correct response content types and clients know which `Accept` values are valid.
