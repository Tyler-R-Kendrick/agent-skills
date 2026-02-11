---
title: "Use `IfValidThenValidate` to chain dependent rules"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Use `IfValidThenValidate` to chain dependent rules

Use `IfValidThenValidate` to chain dependent rules: so that downstream rules only execute when prerequisite rules pass; for example, skip inventory checks if the customer is not active, avoiding unnecessary database queries and misleading compound error messages.
