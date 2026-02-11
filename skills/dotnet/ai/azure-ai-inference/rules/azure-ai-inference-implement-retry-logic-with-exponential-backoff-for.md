---
title: "Implement retry logic with exponential backoff for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Implement retry logic with exponential backoff for...

Implement retry logic with exponential backoff for transient 429 (rate limit) and 503 (service unavailable) errors; `Azure.Core` provides built-in retry policies via `ChatCompletionsClientOptions`.
