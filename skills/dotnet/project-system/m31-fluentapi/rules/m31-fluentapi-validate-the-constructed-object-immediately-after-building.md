---
title: "Validate the constructed object immediately after building by calling a `Validate()` method or using `IValidatableObject`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Validate the constructed object immediately after building by calling a `Validate()` method or using `IValidatableObject`

Validate the constructed object immediately after building by calling a `Validate()` method or using `IValidatableObject`: because the builder enforces property presence but cannot enforce business rules like "amount must be positive."
