---
title: "Register `IChatClient` via `AddChatClient` in DI and inject..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Register `IChatClient` via `AddChatClient` in DI and inject...

Register `IChatClient` via `AddChatClient` in DI and inject it with constructor injection; avoid resolving clients from `IServiceProvider` manually.
