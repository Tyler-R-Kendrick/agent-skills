---
title: "Use `[FluentCollection]` with `IReadOnlyList<T>` rather than `List<T>`"
impact: MEDIUM
impactDescription: "general best practice"
tags: m31-fluentapi, dotnet, project-system, generating-type-safe-fluent-builder-apis-from-c-classes-using-source-generation, enforcing-required-property-ordering-and-compile-time-validation-of-builder-step-sequences
---

## Use `[FluentCollection]` with `IReadOnlyList<T>` rather than `List<T>`

Use `[FluentCollection]` with `IReadOnlyList<T>` rather than `List<T>`: so that the built object exposes an immutable view of the collection; the generator handles the mutable list internally during construction.
