---
title: "Use `WithErrorCode(\"UNIQUE_EMAIL\")` on rules that front-end clients need to handle programmatically"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Use `WithErrorCode("UNIQUE_EMAIL")` on rules that front-end clients need to handle programmatically

Use `WithErrorCode("UNIQUE_EMAIL")` on rules that front-end clients need to handle programmatically: in addition to `WithMessage()`, because error codes are stable across localizations and allow the client to map errors to specific UI behaviors without parsing human-readable text.
