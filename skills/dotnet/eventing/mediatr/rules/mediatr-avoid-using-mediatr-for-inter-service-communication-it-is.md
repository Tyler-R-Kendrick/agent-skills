---
title: "Avoid using MediatR for inter-service communication; it is..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Avoid using MediatR for inter-service communication; it is...

Avoid using MediatR for inter-service communication; it is strictly in-process -- use MassTransit, NServiceBus, or Rebus for distributed messaging.
