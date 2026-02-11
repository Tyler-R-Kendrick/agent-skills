---
title: "Whitelist allowed functions"
impact: MEDIUM
impactDescription: "general best practice"
tags: mathflow, dotnet, general, runtime-mathematical-expression-evaluation, user-defined-formulas, rule-engines-with-math-expressions
---

## Whitelist allowed functions

Whitelist allowed functions: in user-facing scenarios by handling the `EvaluateFunction` event and rejecting unrecognized function names.
