---
title: "Use `session"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Use `session

Use `session.Run(inputs, outputNames)` with explicit output names when the model has multiple outputs to avoid deserializing outputs you do not need.
