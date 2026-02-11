---
title: "Set evaluation timeouts"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mathflow, dotnet, general, runtime-mathematical-expression-evaluation, user-defined-formulas, rule-engines-with-math-expressions
---

## Set evaluation timeouts

Set evaluation timeouts: for user-provided expressions by wrapping `Evaluate()` in a `CancellationToken`-aware task to prevent denial-of-service via expensive computations.
