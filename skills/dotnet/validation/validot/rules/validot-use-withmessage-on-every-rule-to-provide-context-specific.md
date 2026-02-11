---
title: "Use `.WithMessage()` on every rule to provide context-specific error messages"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Use `.WithMessage()` on every rule to provide context-specific error messages

Use `.WithMessage()` on every rule to provide context-specific error messages: rather than relying on Validot's default messages, because default messages reference the rule type (e.g., "Must not be empty") without mentioning the field name, which is unhelpful in API responses.
