---
title: "Normalize input data consistently with the model's training..."
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Normalize input data consistently with the model's training...

Normalize input data consistently with the model's training preprocessing (e.g., ImageNet mean/std for vision models, tokenizer for NLP models); mismatched normalization is the most common cause of incorrect predictions.
