---
title: "Use `[Consumes(\"application/json\", \"application/xml\")]`"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Use `[Consumes("application/json", "application/xml")]`

Use `[Consumes("application/json", "application/xml")]`: on POST/PUT actions to restrict which input formats are accepted, returning `415 Unsupported Media Type` for unrecognized content types rather than attempting to deserialize arbitrary payloads.
