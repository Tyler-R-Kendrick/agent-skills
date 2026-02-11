---
title: "Pass `CancellationToken` through all `InvokeAsync` calls so..."
impact: MEDIUM
impactDescription: "general best practice"
tags: agent-framework, dotnet, ai, building-ai-agents-with-tools-and-plugins, multi-agent-chat-workflows, semantic-kernel-agent-orchestration
---

## Pass `CancellationToken` through all `InvokeAsync` calls so...

Pass `CancellationToken` through all `InvokeAsync` calls so that cancelled HTTP requests stop LLM inference and tool execution immediately.
