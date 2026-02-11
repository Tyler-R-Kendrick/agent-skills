---
title: "Create `Validator<T>` instances once and register them as singletons"
impact: MEDIUM
impactDescription: "general best practice"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Create `Validator<T>` instances once and register them as singletons

Create `Validator<T>` instances once and register them as singletons: in the DI container, because the factory method compiles the specification into an optimized validation plan with pre-allocated error templates; creating new validators per request wastes the compilation cost.
