---
title: "Inspect `session"
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Inspect `session

Inspect `session.InputMetadata` and `session.OutputMetadata` at startup to verify input/output names, shapes, and data types match your code rather than relying on documentation that may be outdated.
