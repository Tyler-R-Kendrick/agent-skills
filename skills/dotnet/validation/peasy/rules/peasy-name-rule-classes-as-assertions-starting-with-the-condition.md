---
title: "Name rule classes as assertions starting with the condition"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Name rule classes as assertions starting with the condition

(e.g., `CustomerIsActiveRule`, `InventoryAvailableRule`, `OrderMinimumAmountRule`) rather than action verbs, because the name should describe the invariant being checked, not the action being performed.
