---
title: "Add `Content-Disposition: attachment; filename=report.csv`"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Add `Content-Disposition: attachment; filename=report.csv`

Add `Content-Disposition: attachment; filename=report.csv`: headers on endpoints intended for file download rather than inline display, so that browsers prompt the user to save the file instead of rendering the CSV text in the browser window.
