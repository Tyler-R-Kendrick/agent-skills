---
title: "Register `ChatCompletionsClient` and `EmbeddingsClient` as..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Register `ChatCompletionsClient` and `EmbeddingsClient` as...

Register `ChatCompletionsClient` and `EmbeddingsClient` as singletons in DI since they are thread-safe and designed for reuse across requests.
