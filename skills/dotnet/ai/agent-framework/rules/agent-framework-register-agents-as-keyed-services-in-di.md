---
title: "Register agents as keyed services in DI..."
impact: MEDIUM
impactDescription: "general best practice"
tags: agent-framework, dotnet, ai, building-ai-agents-with-tools-and-plugins, multi-agent-chat-workflows, semantic-kernel-agent-orchestration
---

## Register agents as keyed services in DI...

Register agents as keyed services in DI (`AddKeyedTransient<ChatCompletionAgent>`) so that consumers can resolve specific agents by name without tight coupling.
