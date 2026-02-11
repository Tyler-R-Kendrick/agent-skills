---
title: "Implement idempotent tool operations where possible (e"
impact: LOW
impactDescription: "recommended but situational"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Implement idempotent tool operations where possible (e

Implement idempotent tool operations where possible (e.g., upsert instead of insert) because LLM clients may retry tool calls on ambiguous responses.
