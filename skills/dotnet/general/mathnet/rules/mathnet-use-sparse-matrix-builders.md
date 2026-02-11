---
title: "Use sparse matrix builders"
impact: MEDIUM
impactDescription: "general best practice"
tags: mathnet, dotnet, general, linear-algebra-matrices, vectors, decompositions
---

## Use sparse matrix builders

(`Matrix<double>.Build.Sparse`) when the matrix has mostly zero entries (e.g., graph adjacency, finite element) to save memory and computation.
