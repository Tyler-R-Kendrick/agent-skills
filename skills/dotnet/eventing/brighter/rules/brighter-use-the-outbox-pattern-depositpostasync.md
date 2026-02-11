---
title: "Use the Outbox pattern (`DepositPostAsync` +..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Use the Outbox pattern (`DepositPostAsync` +...

Use the Outbox pattern (`DepositPostAsync` + `ClearOutboxAsync`) when publishing events after a database write to ensure at-least-once delivery without dual-write issues.
