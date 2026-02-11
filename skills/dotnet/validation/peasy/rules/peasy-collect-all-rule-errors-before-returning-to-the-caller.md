---
title: "Collect all rule errors before returning to the caller"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Collect all rule errors before returning to the caller

Collect all rule errors before returning to the caller: by iterating through the full rule set rather than short-circuiting on the first failure, so that API consumers receive all violations in a single response and can fix them in one attempt.
