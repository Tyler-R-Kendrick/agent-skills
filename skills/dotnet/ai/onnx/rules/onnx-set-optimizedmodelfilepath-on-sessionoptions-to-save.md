---
title: "Set `OptimizedModelFilePath` on `SessionOptions` to save..."
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Set `OptimizedModelFilePath` on `SessionOptions` to save...

Set `OptimizedModelFilePath` on `SessionOptions` to save the optimized graph to disk; subsequent loads skip optimization and start faster.
