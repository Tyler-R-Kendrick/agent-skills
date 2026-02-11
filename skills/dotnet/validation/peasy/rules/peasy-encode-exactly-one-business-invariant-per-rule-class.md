---
title: "Encode exactly one business invariant per rule class"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Encode exactly one business invariant per rule class

(e.g., "customer must be active", "inventory must be available") so that each rule has a single reason to change, can be independently unit tested, and produces a clear, specific error message when violated.
