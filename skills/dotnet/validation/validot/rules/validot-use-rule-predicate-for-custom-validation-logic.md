---
title: "Use `.Rule(predicate)` for custom validation logic"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Use `.Rule(predicate)` for custom validation logic

Use `.Rule(predicate)` for custom validation logic: that Validot's built-in rules do not cover (e.g., password complexity, business-specific formats), keeping the predicate as a pure function without side effects so it can be safely invoked during the synchronous validation pass.
