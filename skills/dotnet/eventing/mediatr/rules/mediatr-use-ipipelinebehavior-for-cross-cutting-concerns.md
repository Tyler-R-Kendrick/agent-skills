---
title: "Use `IPipelineBehavior<,>` for cross-cutting concerns..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Use `IPipelineBehavior<,>` for cross-cutting concerns...

Use `IPipelineBehavior<,>` for cross-cutting concerns (validation, logging, caching, authorization) rather than duplicating logic in every handler.
