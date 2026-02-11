---
title: "Cache `Expression` instances"
impact: MEDIUM
impactDescription: "general best practice"
tags: mathflow, dotnet, general, runtime-mathematical-expression-evaluation, user-defined-formulas, rule-engines-with-math-expressions
---

## Cache `Expression` instances

Cache `Expression` instances: when the same formula is evaluated repeatedly with different parameter values, since parsing is more expensive than parameter binding.
