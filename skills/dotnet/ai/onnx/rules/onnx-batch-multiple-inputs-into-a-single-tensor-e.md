---
title: "Batch multiple inputs into a single tensor (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Batch multiple inputs into a single tensor (e

Batch multiple inputs into a single tensor (e.g., shape `[N, features]`) and call `session.Run` once rather than looping N times, reducing overhead from session lock acquisition and memory allocation.
