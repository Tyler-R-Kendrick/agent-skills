---
title: "Map `ValidationResult.ToDictionary()` to `Results.ValidationProblem()` in minimal API endpoints"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Map `ValidationResult.ToDictionary()` to `Results.ValidationProblem()` in minimal API endpoints

Map `ValidationResult.ToDictionary()` to `Results.ValidationProblem()` in minimal API endpoints: to return a standard RFC 7807 problem details response with per-field errors, which front-end frameworks like React Hook Form and Blazor EditForm can parse and display automatically.
