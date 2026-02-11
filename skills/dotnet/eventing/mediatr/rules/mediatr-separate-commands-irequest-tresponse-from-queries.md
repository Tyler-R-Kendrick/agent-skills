---
title: "Separate commands (`IRequest<TResponse>`) from queries..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Separate commands (`IRequest<TResponse>`) from queries...

Separate commands (`IRequest<TResponse>`) from queries conceptually even though they use the same interface; commands should mutate state and queries should read without side effects.
