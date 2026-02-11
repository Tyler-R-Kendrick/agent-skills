---
title: "Use `CancellationToken` parameters on async tool methods so..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Use `CancellationToken` parameters on async tool methods so...

Use `CancellationToken` parameters on async tool methods so that client disconnections and timeouts stop processing immediately rather than wasting resources.
