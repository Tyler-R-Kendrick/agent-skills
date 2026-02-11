---
title: "Use `RuleForEach` with a child validator via `.SetValidator(new ChildValidator())` for collection properties"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Use `RuleForEach` with a child validator via `.SetValidator(new ChildValidator())` for collection properties

Use `RuleForEach` with a child validator via `.SetValidator(new ChildValidator())` for collection properties: instead of writing manual loops or `Must(x => x.All(...))`, because `RuleForEach` generates per-item error messages with the collection index included (e.g., `"Items[2].Quantity: ..."`), making it clear which item failed.
