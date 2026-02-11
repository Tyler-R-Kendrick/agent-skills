---
title: "Commands should perform state changes and return at most an..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: command-query, dotnet, eventing, separating-readwrite-models, cqs-pattern-implementation, cqrs-architecture
---

## Commands should perform state changes and return at most an...

Commands should perform state changes and return at most an identifier or status; never return full domain entities from command handlers.
