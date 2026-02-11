---
title: "Register formatters in the correct order"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Register formatters in the correct order

Register formatters in the correct order: in `options.OutputFormatters` (JSON first, then specialized formats) because the first formatter that can handle the request's `Accept` header wins, and placing a binary formatter first would cause it to be selected when the client sends `Accept: */*`.
