---
title: "Use `SendFailedMessagesTo(\"error\")` and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: nservicebus, dotnet, eventing, enterprise-messaging, durable-message-handling, saga-orchestration
---

## Use `SendFailedMessagesTo("error")` and...

Use `SendFailedMessagesTo("error")` and `AuditProcessedMessagesTo("audit")` for observability; deploy ServiceControl to monitor and replay failed messages.
