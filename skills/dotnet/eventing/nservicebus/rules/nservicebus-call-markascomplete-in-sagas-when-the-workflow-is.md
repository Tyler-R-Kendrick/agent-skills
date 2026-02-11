---
title: "Call `MarkAsComplete()` in sagas when the workflow is..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: nservicebus, dotnet, eventing, enterprise-messaging, durable-message-handling, saga-orchestration
---

## Call `MarkAsComplete()` in sagas when the workflow is...

Call `MarkAsComplete()` in sagas when the workflow is finished to release persistence resources and prevent saga state from growing indefinitely.
