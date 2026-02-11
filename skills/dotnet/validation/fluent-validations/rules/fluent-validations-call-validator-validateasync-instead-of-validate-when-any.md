---
title: "Call `validator.ValidateAsync()` instead of `Validate()` when any rule in the validator uses `MustAsync`, `WhenAsync`, or `CustomAsync`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Call `validator.ValidateAsync()` instead of `Validate()` when any rule in the validator uses `MustAsync`, `WhenAsync`, or `CustomAsync`

, because the synchronous `Validate()` method throws `AsyncValidatorInvokedSynchronouslyException` if it encounters an async rule.
