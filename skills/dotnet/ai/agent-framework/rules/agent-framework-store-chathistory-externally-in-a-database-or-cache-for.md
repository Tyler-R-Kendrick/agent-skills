---
title: "Store `ChatHistory` externally (in a database or cache) for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: agent-framework, dotnet, ai, building-ai-agents-with-tools-and-plugins, multi-agent-chat-workflows, semantic-kernel-agent-orchestration
---

## Store `ChatHistory` externally (in a database or cache) for...

Store `ChatHistory` externally (in a database or cache) for multi-request conversations rather than keeping it in memory, which is lost between HTTP requests.
