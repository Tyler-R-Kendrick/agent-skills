---
title: "Prefer `ISender` (for `Send`) or `IPublisher` (for..."
impact: LOW
impactDescription: "recommended but situational"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Prefer `ISender` (for `Send`) or `IPublisher` (for...

Prefer `ISender` (for `Send`) or `IPublisher` (for `Publish`) over the full `IMediator` interface to express minimal dependency.
