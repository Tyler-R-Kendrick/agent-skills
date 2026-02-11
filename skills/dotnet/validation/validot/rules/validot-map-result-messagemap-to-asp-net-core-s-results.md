---
title: "Map `result.MessageMap` to ASP.NET Core's `Results.ValidationProblem(IDictionary<string, string[]>)` format"
impact: MEDIUM
impactDescription: "general best practice"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Map `result.MessageMap` to ASP.NET Core's `Results.ValidationProblem(IDictionary<string, string[]>)` format

Map `result.MessageMap` to ASP.NET Core's `Results.ValidationProblem(IDictionary<string, string[]>)` format: for API endpoints, so that front-end clients receive standard RFC 7807 problem details with per-field error arrays that integrate with form validation libraries.
