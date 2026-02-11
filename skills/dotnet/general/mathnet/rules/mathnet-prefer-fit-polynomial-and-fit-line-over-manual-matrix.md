---
title: "Prefer `Fit.Polynomial` and `Fit.Line` over manual matrix construction"
impact: LOW
impactDescription: "recommended but situational"
tags: mathnet, dotnet, general, linear-algebra-matrices, vectors, decompositions
---

## Prefer `Fit.Polynomial` and `Fit.Line` over manual matrix construction

Prefer `Fit.Polynomial` and `Fit.Line` over manual matrix construction: for curve fitting -- these methods handle the normal equations internally and are numerically stable.
