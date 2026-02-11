---
title: "Prefer `Guard.IsInRange(value, min, max)` over separate `IsGreaterThan` and `IsLessThan` calls"
impact: LOW
impactDescription: "recommended but situational"
tags: communitytoolkit-guard, dotnet, validation, writing-concise, consistent-guard-clauses-using-communitytoolkitdiagnostics-for-argument-validation, null-checks
---

## Prefer `Guard.IsInRange(value, min, max)` over separate `IsGreaterThan` and `IsLessThan` calls

Prefer `Guard.IsInRange(value, min, max)` over separate `IsGreaterThan` and `IsLessThan` calls: when both bounds are known, because `IsInRange` performs both checks atomically and generates a single clear exception message including the expected range, reducing debugging time.
