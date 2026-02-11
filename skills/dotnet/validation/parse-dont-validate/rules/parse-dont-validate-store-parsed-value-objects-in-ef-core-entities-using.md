---
title: "Store parsed value objects in EF Core entities using `HasConversion` in `OnModelCreating`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: parse-dont-validate, dotnet, validation, designing-domain-models-where-invalid-states-are-unrepresentable-by-parsing-raw-input-into-strongly-typed-value-objects-at-system-boundaries-use-when-enforcing-invariants-through-the-type-system-rather-than-runtime-validation-checks
---

## Store parsed value objects in EF Core entities using `HasConversion` in `OnModelCreating`

Store parsed value objects in EF Core entities using `HasConversion` in `OnModelCreating`: to map `EmailAddress.Value` to a `nvarchar` column, so the database schema uses primitive types while the C# domain model uses parsed types; this avoids losing type safety at the persistence boundary.
