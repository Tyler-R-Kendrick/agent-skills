---
title: "Use `PredictionEnginePool<TInput, TOutput>` instead of..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mlnet, dotnet, ai, training-custom-ml-models-in-net, binary-and-multi-class-classification, regression-and-forecasting
---

## Use `PredictionEnginePool<TInput, TOutput>` instead of...

Use `PredictionEnginePool<TInput, TOutput>` instead of `PredictionEngine` in ASP.NET Core because `PredictionEngine` is not thread-safe and creates performance bottlenecks under concurrent requests.
