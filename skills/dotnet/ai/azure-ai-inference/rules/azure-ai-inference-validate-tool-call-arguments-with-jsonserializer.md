---
title: "Validate tool call arguments with `JsonSerializer"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Validate tool call arguments with `JsonSerializer

Validate tool call arguments with `JsonSerializer.Deserialize` into strongly-typed models before executing functions to prevent injection of unexpected parameters.
