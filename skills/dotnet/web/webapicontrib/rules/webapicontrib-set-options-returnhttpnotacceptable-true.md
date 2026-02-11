---
title: "Set `options.ReturnHttpNotAcceptable = true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Set `options.ReturnHttpNotAcceptable = true`

Set `options.ReturnHttpNotAcceptable = true`: in `AddControllers()` so that clients requesting unsupported formats (e.g., `Accept: application/yaml` when only JSON and CSV are configured) receive a `406 Not Acceptable` response instead of silently falling back to JSON, making content negotiation failures explicit.
