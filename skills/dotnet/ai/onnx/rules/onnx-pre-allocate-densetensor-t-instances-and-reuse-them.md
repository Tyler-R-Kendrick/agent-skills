---
title: "Pre-allocate `DenseTensor<T>` instances and reuse them..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Pre-allocate `DenseTensor<T>` instances and reuse them...

Pre-allocate `DenseTensor<T>` instances and reuse them across inference calls in hot paths to avoid repeated heap allocations that trigger garbage collection pauses.
