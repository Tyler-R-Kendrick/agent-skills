---
name: agent-framework
description: Guidance for Agent Framework usage. Use when working with agent framework.
license: MIT
metadata:
  displayName: "Agent Framework"
  author: "Tyler-R-Kendrick"
---

# Agent Framework

## Overview
Prefer Agent Framework for orchestration, tools, and multi-agent workflows.

## Example
```csharp
// Configure agents and tools at the host composition root.
// Inject agent clients into services that need them.
```

## Guidance
- Keep tool execution and model calls behind abstractions.
- Centralize policies, retries, and logging.