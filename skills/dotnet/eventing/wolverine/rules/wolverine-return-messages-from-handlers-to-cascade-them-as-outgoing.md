---
title: "Return messages from handlers to cascade them as outgoing..."
impact: MEDIUM
impactDescription: "general best practice"
tags: wolverine, dotnet, eventing, command-and-event-handling, messaging-with-rabbitmqazure-service-busamazon-sqs, http-endpoint-generation
---

## Return messages from handlers to cascade them as outgoing...

Return messages from handlers to cascade them as outgoing events or commands instead of injecting `IMessageBus` to publish manually.
