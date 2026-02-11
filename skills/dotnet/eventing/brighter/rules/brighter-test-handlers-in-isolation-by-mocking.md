---
title: "Test handlers in isolation by mocking..."
impact: MEDIUM
impactDescription: "general best practice"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Test handlers in isolation by mocking...

Test handlers in isolation by mocking `IAmACommandProcessor` and repository dependencies, verifying that commands produce the expected downstream events.
