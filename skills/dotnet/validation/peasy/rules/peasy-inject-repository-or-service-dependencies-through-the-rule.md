---
title: "Inject repository or service dependencies through the rule's constructor"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Inject repository or service dependencies through the rule's constructor

Inject repository or service dependencies through the rule's constructor: rather than accessing static services or `ServiceLocator`, so that rules can be unit tested with mock repositories that return controlled data without hitting a database.
