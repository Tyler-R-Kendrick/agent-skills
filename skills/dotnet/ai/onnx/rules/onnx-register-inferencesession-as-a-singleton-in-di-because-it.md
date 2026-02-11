---
title: "Register `InferenceSession` as a singleton in DI because it..."
impact: MEDIUM
impactDescription: "general best practice"
tags: onnx, dotnet, ai, running-pre-trained-onnx-models-in-net, image-classification-inference, nlp-model-inference
---

## Register `InferenceSession` as a singleton in DI because it...

Register `InferenceSession` as a singleton in DI because it is thread-safe for `Run()` calls and expensive to initialize; creating a session per request causes severe performance degradation.
