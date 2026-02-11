---
title: "Enable MKL native provider"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mathnet, dotnet, general, linear-algebra-matrices, vectors, decompositions
---

## Enable MKL native provider

Enable MKL native provider: for production workloads involving large matrices by calling `Control.UseNativeMKL()` at startup to get 10-100x speedup on linear algebra operations.
