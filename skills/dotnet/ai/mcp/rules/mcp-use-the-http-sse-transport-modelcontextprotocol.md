---
title: "Use the HTTP/SSE transport (`ModelContextProtocol"
impact: MEDIUM
impactDescription: "general best practice"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Use the HTTP/SSE transport (`ModelContextProtocol

Use the HTTP/SSE transport (`ModelContextProtocol.AspNetCore`) for remote deployments and multi-user scenarios; use stdio transport only for local, single-user integrations like Claude Desktop.
