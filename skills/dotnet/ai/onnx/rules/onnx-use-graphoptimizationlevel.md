---
title: "Use `GraphOptimizationLevel"
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Use `GraphOptimizationLevel

Use `GraphOptimizationLevel.ORT_ENABLE_ALL` in `SessionOptions` to enable constant folding, node fusion, and memory planning optimizations that reduce inference latency by 10-30%.
