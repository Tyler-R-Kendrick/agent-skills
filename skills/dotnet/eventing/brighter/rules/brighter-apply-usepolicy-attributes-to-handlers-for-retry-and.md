---
title: "Apply `[UsePolicy]` attributes to handlers for retry and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Apply `[UsePolicy]` attributes to handlers for retry and...

Apply `[UsePolicy]` attributes to handlers for retry and circuit-breaker logic rather than wrapping handler code in try/catch with manual retry loops.
