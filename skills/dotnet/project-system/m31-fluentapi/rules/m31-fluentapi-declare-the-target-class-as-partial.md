---
title: "Declare the target class as `partial`"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Declare the target class as `partial`

Declare the target class as `partial`: if you need to add custom methods or validation logic alongside the generated builder; the generator emits a companion partial class with the builder factory.
