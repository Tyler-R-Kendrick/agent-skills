---
title: "Validate all tool inputs before execution; reject SQL..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mcp, dotnet, ai, building-mcp-tool-servers, consuming-mcp-tools-from-ai-agents, exposing-net-functions-as-mcp-tools
---

## Validate all tool inputs before execution; reject SQL...

Validate all tool inputs before execution; reject SQL queries that are not SELECT statements, validate file paths against allowed directories, and sanitize string inputs to prevent injection.
