---
title: "Always set `MLContext(seed"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mlnet, dotnet, ai, training-custom-ml-models-in-net, binary-and-multi-class-classification, regression-and-forecasting
---

## Always set `MLContext(seed

Always set `MLContext(seed: 42)` (or any fixed seed) during development and evaluation to ensure reproducible results across training runs.
