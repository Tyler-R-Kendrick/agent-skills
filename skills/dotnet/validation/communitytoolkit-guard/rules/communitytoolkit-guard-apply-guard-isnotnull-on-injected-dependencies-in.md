---
title: "Apply `Guard.IsNotNull` on injected dependencies in constructor bodies rather than relying on nullable reference type warnings"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Apply `Guard.IsNotNull` on injected dependencies in constructor bodies rather than relying on nullable reference type warnings

Apply `Guard.IsNotNull` on injected dependencies in constructor bodies rather than relying on nullable reference type warnings: because NRT is a compile-time-only check that does not prevent null at runtime; third-party callers, reflection-based DI containers, and serializers can still pass null.
