---
title: "Set `options.RespectBrowserAcceptHeader = true`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Set `options.RespectBrowserAcceptHeader = true`

Set `options.RespectBrowserAcceptHeader = true`: when you want browsers to receive non-JSON responses based on their `Accept` header, because ASP.NET Core ignores the browser's `Accept: text/html` by default and always returns JSON, which is correct for API clients but confusing for browser-based testing.
