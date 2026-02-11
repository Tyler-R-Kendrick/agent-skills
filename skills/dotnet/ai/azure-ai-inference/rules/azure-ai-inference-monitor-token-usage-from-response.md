---
title: "Monitor token usage from `response"
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Monitor token usage from `response

Monitor token usage from `response.Usage.TotalTokens` and log it per request to track costs and detect anomalous consumption patterns.
