---
title: "Use Peasy rules for cross-aggregate business invariants"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Use Peasy rules for cross-aggregate business invariants

(e.g., "customer credit limit not exceeded across all open orders") that span multiple repositories, and use simple Guard clauses or value objects for single-entity invariants (e.g., "email format is valid").
