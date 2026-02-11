---
title: "Use `ChatClientBuilder` to compose middleware (caching,..."
impact: MEDIUM
impactDescription: "general best practice"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Use `ChatClientBuilder` to compose middleware (caching,...

Use `ChatClientBuilder` to compose middleware (caching, telemetry, function invocation) in a pipeline rather than implementing cross-cutting concerns in every service method.
