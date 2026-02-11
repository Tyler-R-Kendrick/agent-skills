---
title: "Inject `IMediator` or `ISender` into controllers/endpoints,..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Inject `IMediator` or `ISender` into controllers/endpoints,...

Inject `IMediator` or `ISender` into controllers/endpoints, not into domain services; MediatR is a composition root concern, not a domain concern.
