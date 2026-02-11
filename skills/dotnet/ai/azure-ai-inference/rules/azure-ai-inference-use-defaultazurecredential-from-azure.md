---
title: "Use `DefaultAzureCredential` from `Azure"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: azure-ai-inference, dotnet, ai, calling-azure-ai-model-catalog-models, azure-openai-chat-completions, generating-embeddings-from-azure-hosted-models
---

## Use `DefaultAzureCredential` from `Azure

Use `DefaultAzureCredential` from `Azure.Identity` instead of API keys in production; it supports managed identity, Azure CLI, and Visual Studio credentials with automatic fallback.
