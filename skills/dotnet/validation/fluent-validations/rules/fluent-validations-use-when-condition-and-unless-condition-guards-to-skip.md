---
title: "Use `.When(condition)` and `.Unless(condition)` guards to skip rules for optional fields"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Use `.When(condition)` and `.Unless(condition)` guards to skip rules for optional fields

Use `.When(condition)` and `.Unless(condition)` guards to skip rules for optional fields: rather than making every field required and then checking for null manually; conditional rules prevent false-positive validation errors when a property is intentionally omitted (e.g., promo code on an order).
