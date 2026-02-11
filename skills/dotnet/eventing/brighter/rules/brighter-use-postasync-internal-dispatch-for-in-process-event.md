---
title: "Use `PostAsync` (internal dispatch) for in-process event..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: brighter, dotnet, eventing, command-dispatching, cqrs-command-side, request-handler-pipelines
---

## Use `PostAsync` (internal dispatch) for in-process event...

Use `PostAsync` (internal dispatch) for in-process event fans and `PublishAsync` (external) when events must cross service boundaries via a message broker.
