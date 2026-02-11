---
title: "Add CUDA or DirectML execution providers with a CPU..."
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Add CUDA or DirectML execution providers with a CPU...

Add CUDA or DirectML execution providers with a CPU fallback (`AppendExecutionProvider_CUDA` followed by default CPU) so the application runs on any machine regardless of GPU availability.
