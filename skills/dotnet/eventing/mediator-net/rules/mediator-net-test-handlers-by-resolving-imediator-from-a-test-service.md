---
title: "Test handlers by resolving `IMediator` from a test service..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Test handlers by resolving `IMediator` from a test service...

Test handlers by resolving `IMediator` from a test service provider with `AddMediator()` rather than manually constructing handlers, ensuring pipeline behaviors execute.
