---
title: "Inject services (repositories, caches) into the validator constructor for async uniqueness checks"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Inject services (repositories, caches) into the validator constructor for async uniqueness checks

Inject services (repositories, caches) into the validator constructor for async uniqueness checks: and use `MustAsync` rather than calling the service in the controller/handler and then conditionally adding errors; this keeps all validation logic in a single, testable class.
