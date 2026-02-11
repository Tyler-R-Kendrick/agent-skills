---
title: "Design event handlers to be idempotent so that reprocessing..."
impact: MEDIUM
impactDescription: "general best practice"
tags: event-driven, dotnet, eventing, event-driven-architecture-patterns, domain-events, integration-events
---

## Design event handlers to be idempotent so that reprocessing...

Design event handlers to be idempotent so that reprocessing the same event (due to retries or at-least-once delivery) produces the same result.
