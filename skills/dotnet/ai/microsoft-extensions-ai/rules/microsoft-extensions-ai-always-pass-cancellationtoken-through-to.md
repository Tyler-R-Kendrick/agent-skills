---
title: "Always pass `CancellationToken` through to..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Always pass `CancellationToken` through to...

Always pass `CancellationToken` through to `GetResponseAsync` and `GetStreamingResponseAsync` so that HTTP request cancellations propagate to the underlying provider.
