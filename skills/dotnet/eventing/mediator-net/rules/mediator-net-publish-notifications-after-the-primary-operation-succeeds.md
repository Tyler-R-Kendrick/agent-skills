---
title: "Publish notifications after the primary operation succeeds..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Publish notifications after the primary operation succeeds...

Publish notifications after the primary operation succeeds (e.g., after `SaveChangesAsync`) to avoid notifying handlers about uncommitted state.
