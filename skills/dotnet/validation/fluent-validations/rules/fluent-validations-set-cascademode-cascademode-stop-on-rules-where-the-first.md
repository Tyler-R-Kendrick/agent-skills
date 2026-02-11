---
title: "Set `CascadeMode = CascadeMode.Stop` on rules where the first failure makes subsequent checks meaningless"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Set `CascadeMode = CascadeMode.Stop` on rules where the first failure makes subsequent checks meaningless

(e.g., `NotEmpty` before `EmailAddress`), preventing redundant error messages like both "Email is required" and "Invalid email format" appearing for an empty field.
