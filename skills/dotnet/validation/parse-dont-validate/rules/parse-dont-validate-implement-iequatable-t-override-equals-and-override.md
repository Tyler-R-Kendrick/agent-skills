---
title: "Implement `IEquatable<T>`, override `Equals`, and override `GetHashCode` on all value objects"
impact: LOW
impactDescription: "recommended but situational"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Implement `IEquatable<T>`, override `Equals`, and override `GetHashCode` on all value objects

Implement `IEquatable<T>`, override `Equals`, and override `GetHashCode` on all value objects: using the underlying value, so that two `EmailAddress` instances with the same parsed value are considered equal in collections, dictionary lookups, and LINQ operations.
