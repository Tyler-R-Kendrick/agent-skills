---
title: "Write integration tests that send requests with different `Accept` headers"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Write integration tests that send requests with different `Accept` headers

Write integration tests that send requests with different `Accept` headers: and assert on both the response `Content-Type` and the deserialized body shape, ensuring that content negotiation produces correct output for each format and that CSV column headers match the DTO property names.
