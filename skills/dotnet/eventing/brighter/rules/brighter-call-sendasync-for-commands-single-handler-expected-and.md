---
title: "Call `SendAsync` for commands (single handler expected) and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Call `SendAsync` for commands (single handler expected) and...

Call `SendAsync` for commands (single handler expected) and `PublishAsync` for events (fan-out to multiple handlers).
