---
title: "Program against `IChatClient` and `IEmbeddingGenerator<,>`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Program against `IChatClient` and `IEmbeddingGenerator<,>`...

Program against `IChatClient` and `IEmbeddingGenerator<,>` interfaces in all service code; configure the concrete provider (`OpenAIChatClient`, `OllamaChatClient`) only at the composition root to enable swapping providers without code changes.
