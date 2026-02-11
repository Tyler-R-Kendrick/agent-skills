---
title: "Seed random number generators"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mathnet, dotnet, general, linear-algebra-matrices, vectors, decompositions
---

## Seed random number generators

Seed random number generators: with a fixed value in tests for reproducibility, and use `SystemRandomSource.Default` in production for thread safety.
