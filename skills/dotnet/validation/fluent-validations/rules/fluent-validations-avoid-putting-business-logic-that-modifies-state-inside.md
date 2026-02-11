---
title: "Avoid putting business logic that modifies state inside `Must` or `MustAsync` predicates"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Avoid putting business logic that modifies state inside `Must` or `MustAsync` predicates

Avoid putting business logic that modifies state inside `Must` or `MustAsync` predicates: because validators may be invoked multiple times (auto-validation + manual validation), and side effects in validation rules cause duplicated operations, audit log entries, or database writes.
