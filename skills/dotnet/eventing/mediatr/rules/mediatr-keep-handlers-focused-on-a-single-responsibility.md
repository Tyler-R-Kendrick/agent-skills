---
title: "Keep handlers focused on a single responsibility"
impact: MEDIUM
impactDescription: "general best practice"
tags: mediatr, dotnet, eventing, in-process-commandquery-dispatch, cqrs-with-pipeline-behaviors, notification-fan-out
---

## Keep handlers focused on a single responsibility

Keep handlers focused on a single responsibility: one handler per command or query, with no shared mutable state between handlers.
