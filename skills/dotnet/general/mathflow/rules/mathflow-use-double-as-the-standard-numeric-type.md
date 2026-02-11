---
title: "Use `double` as the standard numeric type"
impact: MEDIUM
impactDescription: "general best practice"
tags: mathflow, dotnet, general, runtime-mathematical-expression-evaluation, user-defined-formulas, rule-engines-with-math-expressions
---

## Use `double` as the standard numeric type

Use `double` as the standard numeric type: for parameters because NCalc internally works with `double` for arithmetic, and mixing `int`/`decimal` can cause unexpected type coercion.
