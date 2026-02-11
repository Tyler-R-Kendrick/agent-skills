---
title: "Validate commands before executing them, preferably in a..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: command-query, dotnet, eventing, separating-readwrite-models, cqs-pattern-implementation, cqrs-architecture
---

## Validate commands before executing them, preferably in a...

Validate commands before executing them, preferably in a decorator or pipeline step, so invalid commands never reach the handler.
