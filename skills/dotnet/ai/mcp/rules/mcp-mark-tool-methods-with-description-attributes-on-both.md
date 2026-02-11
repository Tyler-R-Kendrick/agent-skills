---
title: "Mark tool methods with `[Description]` attributes on both..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Mark tool methods with `[Description]` attributes on both...

Mark tool methods with `[Description]` attributes on both the method and each parameter to provide clear documentation that LLM clients use when deciding which tools to call and how to format arguments.
