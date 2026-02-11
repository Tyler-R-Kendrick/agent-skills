---
title: "Register agent clients via dependency injection with..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: a2a, dotnet, ai, agent-to-agent-communication, multi-agent-orchestration, agent-discovery-via-agent-cards
---

## Register agent clients via dependency injection with...

Register agent clients via dependency injection with `AddA2AServer` rather than constructing clients manually, to enable proper lifetime management and testability.
