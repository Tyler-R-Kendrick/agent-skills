---
title: "Keep handlers single-purpose; extract shared logic into..."
impact: MEDIUM
impactDescription: "general best practice"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Keep handlers single-purpose; extract shared logic into...

Keep handlers single-purpose; extract shared logic into services injected via the constructor instead of duplicating code across handlers.
