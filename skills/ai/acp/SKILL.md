---
name: acp
description: |
    Use when implementing the Agent Communication Protocol (ACP) for REST-based agent-to-agent communication, task delegation, and multimodal message exchange.
    USE FOR: ACP agent servers, ACP client integration, agent discovery via manifests, run lifecycle management, session-based stateful workflows, BeeAI agents
    DO NOT USE FOR: JSON-RPC agent communication (use a2a), tool integration for LLMs (use mcp), agent payments (use ap2 or x402), agent definition (use adl)
license: Apache-2.0
metadata:
  displayName: "ACP (Agent Communication Protocol)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# ACP — Agent Communication Protocol

## Overview
ACP is an open protocol (originally from IBM / BeeAI, now contributed to the Linux Foundation alongside A2A) for communication between AI agents, applications, and humans. It uses plain REST endpoints — no JSON-RPC, no specialized transport — making it usable with standard HTTP tools like curl, Postman, or any HTTP client.

> **Status:** The standalone ACP repository is archived. ACP's design has been merged into the A2A project under the Linux Foundation. New projects should evaluate A2A, but existing ACP deployments and the SDK remain functional.

## Core Concepts

### Agent Manifest
Every ACP agent exposes a manifest describing its capabilities — without revealing implementation details:
```json
{
  "name": "research-agent",
  "description": "Finds and summarizes information on any topic",
  "metadata": {
    "capabilities": ["streaming", "sessions"]
  }
}
```

### Messages and Parts
Agents exchange **Messages** composed of **Parts**. Each part carries a MIME type, enabling multimodal payloads (text, images, audio, files) without protocol changes:
```json
{
  "role": "user",
  "parts": [
    {
      "content": "Summarize this document",
      "content_type": "text/plain",
      "content_encoding": "plain"
    },
    {
      "content": "<base64-data>",
      "content_type": "application/pdf",
      "content_encoding": "base64",
      "name": "report.pdf"
    }
  ]
}
```

### Part Metadata
Parts can carry structured metadata for observability and attribution:
- **TrajectoryMetadata** — exposes reasoning steps and tool calls
- **CitationMetadata** — attributes content to source documents

## REST API

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/agents` | List available agents with their manifests |
| `POST` | `/runs` | Execute an agent (sync, async, or streaming) |

### Run Lifecycle
```
pending → running → [awaiting] → completed / error
```

| State | Meaning |
|-------|---------|
| `pending` | Run queued, not yet started |
| `running` | Agent is executing |
| `awaiting` | Agent paused, requesting external input |
| `completed` | Finished successfully |
| `error` | Execution failed |

### Communication Modes
ACP supports three response modes on a single endpoint:
- **Synchronous** — block until the run completes
- **Asynchronous** — return immediately, poll for status
- **Streaming** — SSE stream of incremental results

## Python Server Example
```python
from acp_sdk.server import Server, Context
from acp_sdk.models import Message, MessagePart

server = Server()

@server.agent()
async def summarizer(input: list[Message], context: Context):
    """Summarizes the provided text."""
    for message in input:
        text = message.parts[0].content
        yield {"thought": "Analyzing content..."}
        yield Message(
            role="agent/summarizer",
            parts=[MessagePart(
                content=f"Summary of: {text[:50]}...",
                content_type="text/plain"
            )]
        )

server.run()
```

## Python Client Example
```python
from acp_sdk.client import Client
from acp_sdk.models import Message, MessagePart

async with Client(base_url="http://localhost:8000") as client:
    # Discover agents
    agents = await client.agents()

    # Synchronous run
    run = await client.run_sync(
        agent="summarizer",
        input=[Message(
            role="user",
            parts=[MessagePart(
                content="Summarize this article...",
                content_type="text/plain"
            )]
        )]
    )
    print(run.output)
```

## Session Management
Sessions enable stateful, multi-turn conversations. The SDK manages session state automatically, giving agents access to complete interaction history:
```python
async with Client(base_url="http://localhost:8000") as client:
    # First turn — creates a session
    run1 = await client.run_sync(
        agent="assistant",
        input=[Message(role="user", parts=[
            MessagePart(content="My name is Alice", content_type="text/plain")
        ])]
    )

    # Second turn — continues the session
    run2 = await client.run_sync(
        agent="assistant",
        session=run1.session_id,
        input=[Message(role="user", parts=[
            MessagePart(content="What is my name?", content_type="text/plain")
        ])]
    )
```

## High Availability
For production deployments, ACP supports centralized storage backends:
- **Redis** — fast, in-memory session and run state
- **PostgreSQL** — durable, persistent storage
- **Distributed sessions** — URI-based resource sharing across server instances

## ACP vs A2A vs MCP
| Aspect | ACP | A2A | MCP |
|--------|-----|-----|-----|
| Transport | REST (HTTP) | HTTP + JSON-RPC + SSE | stdio, HTTP + SSE |
| Discovery | `GET /agents` | Agent Cards (`.well-known/agent.json`) | Capabilities negotiation |
| Interaction | Runs (sync/async/stream) | Tasks (long-running) | Request-response (tool calls) |
| Focus | Agent-to-agent + human-to-agent | Agent-to-agent delegation | Agent-to-tool integration |
| Multimodal | MIME-typed parts | Typed parts | Tool arguments |
| Sessions | Built-in stateful sessions | Task context | Conversation context |

## SDKs
| Language | Server | Client |
|----------|--------|--------|
| Python | `acp-sdk` | `acp-sdk` |
| TypeScript | — | `acp-sdk` |

```bash
# Python
pip install acp-sdk

# TypeScript
npm install acp-sdk
```

## Best Practices
- Use `GET /agents` for runtime discovery so clients can dynamically route to the right agent without hardcoding endpoints.
- Use sessions for multi-turn workflows — the SDK handles session continuity automatically.
- Use streaming mode for long-running agents to give callers incremental progress.
- Attach `TrajectoryMetadata` to parts when exposing reasoning steps for observability.
- Use Redis or PostgreSQL backends in production for high availability and fault tolerance.
- Since ACP has merged into A2A, evaluate A2A for greenfield projects — but ACP SDKs remain functional for existing deployments.
