---
title: "Set explicit `MaxTokens` on every request to prevent..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Set explicit `MaxTokens` on every request to prevent...

Set explicit `MaxTokens` on every request to prevent unexpectedly large responses that consume budget; pair this with `Temperature` tuning per use case (0.0 for deterministic, 0.7-1.0 for creative).
