---
name: adl
description: |
    Use when defining AI agents declaratively with Agent Definition Language (ADL). Covers agent identity, LLM configuration, tools, permissions, RAG inputs, and governance metadata.
    USE FOR: declarative agent blueprints, agent identity and permissions, LLM configuration, governance metadata
    DO NOT USE FOR: agent runtime orchestration (use cagent), tool integration (use mcp), agent communication (use a2a)
license: Apache-2.0
metadata:
  displayName: "ADL (Agent Definition Language)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Agent Definition Language (ADL) GitHub Repository"
    url: "https://github.com/nextmoca/agent-definition-language"
  - title: "Eclipse LMOS Project"
    url: "https://eclipse.dev/lmos/"
---

# ADL — Agent Definition Language

## Overview
ADL is a vendor-neutral, declarative specification for defining AI agents — their identity, capabilities, tools, permissions, and governance metadata. It acts as a portable blueprint (like OpenAPI for APIs) that is independent of any runtime, framework, or vendor. Open-sourced by Next Moca under Apache 2.0, also adopted by Eclipse LMOS.

## Purpose
ADL defines **what** an agent is and **what it can do**, not how it runs. It complements:
- **MCP** — how agents call tools at runtime
- **A2A** — how agents communicate
- **Agent Skills** — how capabilities are packaged

## Example
```yaml
adl: "1.0"

agent:
  name: research-assistant
  version: "1.0.0"
  description: "Researches topics and produces structured summaries"
  author: "team-name"
  license: MIT

  llm:
    provider: anthropic
    model: claude-sonnet-4-5-20250929
    temperature: 0.3
    max_tokens: 4096
    system_prompt: |
      You are a research assistant. Produce well-structured,
      factual summaries with cited sources.

  tools:
    - name: web-search
      type: mcp
      server: "search-server"
      description: "Search the web for information"
    - name: read-document
      type: mcp
      server: "doc-server"
      description: "Read and parse documents"

  rag:
    - name: knowledge-base
      source: "vector-store://company-docs"
      description: "Internal documentation and policies"

  permissions:
    allowed_tools:
      - web-search
      - read-document
    denied_actions:
      - file_write
      - code_execution
    boundaries:
      max_tokens_per_request: 8192
      max_requests_per_minute: 30

  dependencies:
    - name: fact-checker
      type: agent
      description: "Validates factual claims before including them"

  governance:
    owner: "research-team@company.com"
    review_status: approved
    last_reviewed: "2026-01-15"
    tags:
      - research
      - internal
```

## Schema Sections

### Agent Identity
| Field | Description |
|-------|-------------|
| `name` | Unique agent identifier |
| `version` | Semantic version |
| `description` | What the agent does |
| `author` | Creator or team |
| `license` | SPDX identifier |

### LLM Configuration
| Field | Description |
|-------|-------------|
| `provider` | Model provider (anthropic, openai, etc.) |
| `model` | Specific model ID |
| `temperature` | Sampling temperature |
| `max_tokens` | Maximum output tokens |
| `system_prompt` | System-level instructions |

### Tools
Declares which tools the agent can use, with type and connection info.

### RAG
Declares knowledge sources the agent can access for retrieval-augmented generation.

### Permissions & Boundaries
Defines what the agent is allowed and forbidden to do, plus rate limits and resource caps.

### Dependencies
Other agents or services this agent relies on.

### Governance
Ownership, review status, and audit metadata for enterprise compliance.

## ADL vs Other Formats
| Aspect | ADL | AGENTS.md | Agent Skills |
|--------|-----|-----------|-------------|
| Focus | Agent definition (identity + config) | Project-level coding guidance | Reusable capability packaging |
| Format | Structured YAML schema | Freeform Markdown | YAML frontmatter + Markdown |
| Scope | Per-agent blueprint | Per-project instructions | Per-skill instructions |
| Runtime | Framework-agnostic | N/A | Platform-agnostic |

## Best Practices
- Define permissions explicitly — principle of least privilege for tools and actions.
- Use semantic versioning so dependent systems can track agent changes.
- Include governance metadata (owner, review status) for enterprise audit trails.
- Keep system prompts in ADL rather than hardcoded in application code for portability.
- Declare dependencies on other agents explicitly so the orchestration layer knows the graph.
- Use ADL alongside MCP (tool runtime) and A2A (communication) — ADL defines the agent, the other protocols run it.
