---
title: "Use `RequestTimeout` in sagas for time-based business rules..."
impact: MEDIUM
impactDescription: "general best practice"
tags: nservicebus, dotnet, eventing, enterprise-messaging, durable-message-handling, saga-orchestration
---

## Use `RequestTimeout` in sagas for time-based business rules...

Use `RequestTimeout` in sagas for time-based business rules (e.g., cancel unpaid orders after 7 days) instead of external scheduling systems.
