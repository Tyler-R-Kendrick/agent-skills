---
title: "Keep tool responses under 10,000 characters to avoid..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Keep tool responses under 10,000 characters to avoid...

Keep tool responses under 10,000 characters to avoid consuming excessive context window; paginate large result sets and return counts with partial data.
