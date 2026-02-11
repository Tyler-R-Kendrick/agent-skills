---
title: "Set `CsvFormatterOptions.CsvDelimiter`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Set `CsvFormatterOptions.CsvDelimiter`

Set `CsvFormatterOptions.CsvDelimiter`: explicitly (comma or semicolon) and `IncludeExcelDelimiterHeader` based on the target audience, because European locales use semicolons as CSV delimiters and Excel requires a `sep=` header to parse the file correctly.
