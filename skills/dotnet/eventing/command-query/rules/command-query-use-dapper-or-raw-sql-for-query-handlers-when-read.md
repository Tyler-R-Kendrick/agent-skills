---
title: "Use Dapper or raw SQL for query handlers when read..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: command-query, dotnet, eventing, separating-readwrite-models, cqs-pattern-implementation, cqrs-architecture
---

## Use Dapper or raw SQL for query handlers when read...

Use Dapper or raw SQL for query handlers when read performance is critical, reserving EF Core for the write side where change tracking is valuable.
