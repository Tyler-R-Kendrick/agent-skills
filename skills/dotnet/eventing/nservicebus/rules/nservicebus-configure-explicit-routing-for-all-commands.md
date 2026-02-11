---
title: "Configure explicit routing for all commands..."
impact: MEDIUM
impactDescription: "general best practice"
tags: nservicebus, dotnet, eventing, enterprise-messaging, durable-message-handling, saga-orchestration
---

## Configure explicit routing for all commands...

Configure explicit routing for all commands (`RouteToEndpoint`) so the sender does not need to know endpoint addresses at runtime.
