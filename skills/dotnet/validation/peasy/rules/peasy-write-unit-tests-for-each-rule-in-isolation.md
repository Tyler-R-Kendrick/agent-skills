---
title: "Write unit tests for each rule in isolation"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Write unit tests for each rule in isolation

Write unit tests for each rule in isolation: by mocking the repository to return specific data and asserting on `rule.ValidateAsync().IsValid` and `.ErrorMessage`, independent of the service layer or HTTP pipeline; test the rule set composition separately.
