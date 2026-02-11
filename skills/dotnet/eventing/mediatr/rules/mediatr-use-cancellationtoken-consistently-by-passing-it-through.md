---
title: "Use `CancellationToken` consistently by passing it through..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Use `CancellationToken` consistently by passing it through...

Use `CancellationToken` consistently by passing it through from the request to the handler and to all async calls within the handler.
