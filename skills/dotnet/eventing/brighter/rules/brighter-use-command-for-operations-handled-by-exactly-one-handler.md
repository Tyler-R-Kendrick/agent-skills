---
title: "Use `Command` for operations handled by exactly one handler..."
impact: MEDIUM
impactDescription: "general best practice"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Use `Command` for operations handled by exactly one handler...

Use `Command` for operations handled by exactly one handler and `Event` for notifications that may have zero or more subscribers.
