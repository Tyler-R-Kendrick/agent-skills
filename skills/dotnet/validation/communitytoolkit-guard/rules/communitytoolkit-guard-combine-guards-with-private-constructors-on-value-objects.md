---
title: "Combine guards with private constructors on value objects"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Combine guards with private constructors on value objects

(e.g., `EmailAddress.Create(string)`) so that the type system guarantees all instances are valid; this moves validation to the creation boundary and eliminates the need to re-validate the same data in every consuming method.
