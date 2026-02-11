---
title: "Cache embedding results with `UseDistributedCache` when the..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Cache embedding results with `UseDistributedCache` when the...

Cache embedding results with `UseDistributedCache` when the same texts are embedded repeatedly (e.g., static document chunks) to avoid redundant API calls.
