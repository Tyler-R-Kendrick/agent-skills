---
name: mcp
description: |
    Use when implementing or integrating with the Model Context Protocol (MCP) for AI tool servers, resources, prompts, and context management.
    USE FOR: building MCP tool servers, exposing resources to agents, prompt templates, connecting agents to external APIs
    DO NOT USE FOR: agent-to-agent communication (use a2a), interactive UI rendering (use mcp-apps), agent payments (use x402 or ap2)
license: MIT
metadata:
  displayName: "MCP (Model Context Protocol)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# MCP — Model Context Protocol

## Overview
MCP is an open protocol from Anthropic that standardizes how AI agents discover and use tools, access resources, and receive prompts from external servers. It enables a universal interface between AI models and the systems they interact with.

## Architecture
```
Host (Claude, VS Code, IDE)
  └── Client (maintains 1:1 connection)
        └── Server (exposes tools, resources, prompts)
```

## Core Primitives

### Tools
Functions the agent can call:
```json
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": { "type": "string" }
    },
    "required": ["city"]
  }
}
```

### Resources
Data the agent can read (files, database records, API responses):
```json
{
  "uri": "file:///project/config.json",
  "name": "Project Configuration",
  "mimeType": "application/json"
}
```

### Prompts
Reusable prompt templates the server can offer:
```json
{
  "name": "summarize",
  "description": "Summarize a document",
  "arguments": [
    { "name": "content", "description": "Text to summarize", "required": true }
  ]
}
```

## Transport Options
| Transport | Use Case |
|-----------|----------|
| **stdio** | Local servers running as child processes |
| **Streamable HTTP** | Remote servers over HTTP with SSE streaming |

## Building an MCP Server (Python)
```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather-server")

@mcp.tool()
def get_weather(city: str) -> str:
    """Get current weather for a city."""
    return f"Sunny, 72°F in {city}"

@mcp.resource("config://app")
def get_config() -> str:
    """Return application configuration."""
    return '{"theme": "dark", "lang": "en"}'
```

## Building an MCP Server (TypeScript)
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "weather-server", version: "1.0.0" });

server.tool("get_weather", { city: z.string() }, async ({ city }) => ({
  content: [{ type: "text", text: `Sunny, 72°F in ${city}` }],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Client Configuration
Configure MCP servers in Claude Desktop or Claude Code:
```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["-m", "weather_server"],
      "env": { "API_KEY": "..." }
    },
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer ..." }
    }
  }
}
```

## Lifecycle
1. **Initialize** — client and server exchange capabilities
2. **Discover** — client lists available tools, resources, prompts
3. **Invoke** — client calls tools, reads resources, uses prompts
4. **Notify** — server sends change notifications (resource updates, tool list changes)

## Best Practices
- Keep tool descriptions clear and specific — the AI model uses them to decide when to call tools.
- Use JSON Schema for `inputSchema` with `required` fields for type safety.
- Return structured data (JSON) from tools when possible for downstream processing.
- Use resources for read-only data access and tools for actions with side effects.
- Implement proper error handling — return error content rather than throwing exceptions.
- Use stdio transport for local development and Streamable HTTP for production deployments.
- Version your server capabilities so clients can adapt to changes.
