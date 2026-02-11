# cagent — Docker Agent Runtime

## Overview
cagent is an open-source multi-agent runtime from Docker that lets you define, orchestrate, and run teams of AI agents. Agents are configured in YAML with specialized capabilities, tools, and sub-agents. cagent supports MCP for tool integration, the Agent Client Protocol (ACP) for IDE integration, and runs locally via `cagent run`. Bundled in Docker Desktop.

## Installation
```bash
# Bundled with Docker Desktop, or install standalone:
brew install docker/tap/cagent     # macOS
# Or download from github.com/docker/cagent/releases
```

## Agent Configuration
Agents are defined in a `cagent.yaml` file:
```yaml
version: "2"

agents:
  root:
    model: anthropic/claude-sonnet-4-5-20250929
    description: A helpful AI assistant with search and file access
    instruction: |
      You are a knowledgeable assistant that helps users with various tasks.
      Be helpful, accurate, and concise in your responses.
      Write your results to disk.
    toolsets:
      - type: mcp
        ref: docker:duckduckgo
      - type: mcp
        command: rust-mcp-filesystem
        args: ["--allow-write", "."]
        tools: ["read_file", "write_file"]
```

## Model Configuration
Define models inline or as named references:
```yaml
version: "2"

models:
  fast:
    provider: openai
    model: gpt-5-mini
    max_tokens: 4096
  strong:
    provider: anthropic
    model: claude-sonnet-4-5-20250929
    max_tokens: 64000

agents:
  root:
    model: strong
    description: Main orchestrator
    sub_agents: [researcher, writer]

  researcher:
    model: fast
    description: Finds information
    toolsets:
      - type: mcp
        ref: docker:duckduckgo

  writer:
    model: strong
    description: Writes polished content
```

## MCP Tool Integration

### Docker MCP Gateway
Use containerized MCP servers via Docker's MCP Gateway:
```yaml
toolsets:
  - type: mcp
    ref: docker:duckduckgo      # Search
  - type: mcp
    ref: docker:fetch           # HTTP fetch
  - type: mcp
    ref: docker:github          # GitHub API
```

### Standard MCP Servers
Use any MCP server via stdio:
```yaml
toolsets:
  - type: mcp
    command: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
    tools: ["read_file", "write_file", "list_directory"]
    env:
      - "NODE_ENV=production"
```

## Built-in Toolsets
| Type | Description |
|------|-------------|
| `mcp` | MCP server integration (Docker Gateway or stdio) |
| `think` | Internal reasoning / chain-of-thought |
| `todo` | Task tracking and management |
| `memory` | Persistent memory across conversations |

```yaml
toolsets:
  - type: think
  - type: todo
  - type: memory
    path: ./agent-memory.db
```

## Sub-Agents
Orchestrate multiple specialized agents:
```yaml
agents:
  root:
    model: strong
    description: Orchestrates research and writing tasks
    instruction: |
      Delegate research to the researcher agent.
      Delegate writing to the writer agent.
      Synthesize their outputs into a final response.
    sub_agents: [researcher, writer]

  researcher:
    model: fast
    description: Searches the web and gathers information
    toolsets:
      - type: mcp
        ref: docker:duckduckgo

  writer:
    model: strong
    description: Produces polished, well-structured content
    toolsets:
      - type: think
```

## Running Agents
```bash
# Run the default agent
cagent run

# Run with a specific config file
cagent run -f my-agent.yaml

# Run in non-interactive mode with input
echo "Summarize the latest AI news" | cagent run
```

## Best Practices
- Start with a single `root` agent and add sub-agents only when you need specialization.
- Use Docker MCP Gateway (`ref: docker:*`) for containerized, reproducible tool access.
- Use `tools: [...]` to restrict which MCP tools an agent can access (principle of least privilege).
- Define named model references in the `models` section to avoid duplication and make switching easy.
- Use the `think` toolset for agents that need to reason through complex problems before acting.
- Use the `memory` toolset with a persistent path for agents that need to retain context across sessions.
- Keep agent instructions focused — each sub-agent should have a clear, narrow responsibility.
