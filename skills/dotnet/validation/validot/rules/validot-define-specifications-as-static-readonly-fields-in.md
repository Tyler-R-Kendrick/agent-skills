---
title: "Define specifications as `static readonly` fields in dedicated specification classes"
impact: MEDIUM
impactDescription: "general best practice"
tags: validot, dotnet, validation, defining-high-performance-validation-specifications-using-validots-fluent-specification-builder-use-when-you-need-allocation-free-validation-with-reusable-specifications, fast-execution, and-detailed-error-output
---

## Define specifications as `static readonly` fields in dedicated specification classes

(e.g., `OrderSpecifications.CreateOrderSpec`) rather than inline in service constructors, so that specifications are discoverable, reusable across validators, and unit-testable independently.
