---
title: "Use separate `EmbeddingsClient` instances for different..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Use separate `EmbeddingsClient` instances for different...

Use separate `EmbeddingsClient` instances for different embedding models when your application needs both document embeddings and query embeddings with different dimensionality.
