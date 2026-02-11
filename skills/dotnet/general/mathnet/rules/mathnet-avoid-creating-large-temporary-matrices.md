---
title: "Avoid creating large temporary matrices"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mathnet, dotnet, general, linear-algebra-matrices, vectors, decompositions
---

## Avoid creating large temporary matrices

Avoid creating large temporary matrices: in loops -- reuse allocated matrices with in-place operations (e.g., `matrix.Multiply(other, result)`) to reduce GC pressure.
