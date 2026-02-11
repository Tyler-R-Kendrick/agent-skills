---
title: "Write unit tests for each validator by instantiating it directly with mocked dependencies"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Write unit tests for each validator by instantiating it directly with mocked dependencies

Write unit tests for each validator by instantiating it directly with mocked dependencies: and asserting on `validationResult.IsValid`, `validationResult.Errors.Count`, and specific `validationResult.Errors[0].PropertyName` values; do not rely on integration tests through the HTTP pipeline alone.
