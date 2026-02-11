# A2A — Agent-to-Agent Protocol

## Overview
A2A is an open protocol from Google that defines how AI agents communicate, delegate tasks, and collaborate with each other. While MCP focuses on tool integration, A2A addresses agent-to-agent interoperability.

## Core Concepts

### Agent Card
Every A2A agent publishes an **Agent Card** at `/.well-known/agent.json` describing its capabilities:
```json
{
  "name": "Research Agent",
  "description": "Finds and summarizes information on any topic",
  "url": "https://research-agent.example.com",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {
      "id": "web-research",
      "name": "Web Research",
      "description": "Search and summarize web content"
    }
  ]
}
```

### Task Lifecycle
A2A communication revolves around **Tasks** with a defined lifecycle:
```
submitted → working → [input-required] → completed / failed / canceled
```

### Messages and Parts
Agents exchange **Messages** containing **Parts** (text, files, data):
```json
{
  "role": "agent",
  "parts": [
    { "type": "text", "text": "Here is the research summary." },
    { "type": "file", "file": { "name": "report.pdf", "mimeType": "application/pdf", "bytes": "..." } }
  ]
}
```

## Transport
A2A uses HTTP + JSON-RPC 2.0:
- **`POST /`** — send JSON-RPC requests
- **SSE** — streaming responses for long-running tasks
- **Push notifications** — webhook callbacks for async completion

## Key Methods
| Method | Description |
|--------|-------------|
| `tasks/send` | Send a message to create or continue a task |
| `tasks/sendSubscribe` | Send and subscribe to streaming updates |
| `tasks/get` | Get current task state |
| `tasks/cancel` | Cancel an in-progress task |
| `tasks/pushNotification/set` | Register a webhook for task updates |

## Example Flow
```
Client                          Agent
  │                               │
  │── tasks/send ────────────────►│  Create task with user message
  │◄── status: working ──────────│  Agent begins processing
  │◄── status: completed ────────│  Agent returns result
  │                               │
```

## Multi-Agent Collaboration
A client agent can delegate subtasks to specialist agents:
1. Discover agents via their Agent Cards
2. Send tasks to the most suitable agent
3. Receive results and incorporate into the parent task
4. Handle `input-required` status for interactive collaboration

## A2A vs MCP
| Aspect | A2A | MCP |
|--------|-----|-----|
| Focus | Agent-to-agent communication | Agent-to-tool integration |
| Discovery | Agent Cards (`.well-known/agent.json`) | Server capabilities negotiation |
| Transport | HTTP + JSON-RPC + SSE | stdio, HTTP + SSE |
| Interaction | Task-based (long-running) | Request-response (tool calls) |
| Complementary | Delegates to agents | Calls tools |

## Best Practices
- Publish an Agent Card with accurate skill descriptions so other agents can discover and route tasks correctly.
- Use streaming (`tasks/sendSubscribe`) for long-running tasks to provide progress updates.
- Handle the `input-required` status to support interactive multi-turn workflows.
- Combine A2A with MCP — use A2A for agent-to-agent delegation and MCP for tool integration within each agent.
- Implement idempotency on task IDs so retries don't create duplicate work.
