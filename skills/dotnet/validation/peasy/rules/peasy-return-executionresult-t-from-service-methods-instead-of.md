---
title: "Return `ExecutionResult<T>` from service methods instead of throwing exceptions on business rule failures"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Return `ExecutionResult<T>` from service methods instead of throwing exceptions on business rule failures

, because rule violations are expected outcomes (not programming errors) and should be communicated to the caller as structured error lists that map to HTTP 400 responses.
