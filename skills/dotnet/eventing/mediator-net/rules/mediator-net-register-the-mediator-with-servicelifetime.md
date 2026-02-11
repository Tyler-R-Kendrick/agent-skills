---
title: "Register the mediator with `ServiceLifetime"
impact: MEDIUM
impactDescription: "general best practice"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Register the mediator with `ServiceLifetime

Register the mediator with `ServiceLifetime.Scoped` to align handler lifetimes with per-request DI scopes and EF Core DbContext lifetimes.
