---
title: "Create a `RuleSet` class (e.g., `CanPlaceOrderRuleSet`) that encapsulates related rules for a use case"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Create a `RuleSet` class (e.g., `CanPlaceOrderRuleSet`) that encapsulates related rules for a use case

Create a `RuleSet` class (e.g., `CanPlaceOrderRuleSet`) that encapsulates related rules for a use case: rather than scattering rule instantiation across service methods, keeping rule composition testable and reusable across multiple entry points (API, message handler, scheduled job).
