---
title: "Register pipeline behaviors in the correct order (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Register pipeline behaviors in the correct order (e

Register pipeline behaviors in the correct order (e.g., logging first, then validation, then caching) since they execute as a nested middleware chain.
