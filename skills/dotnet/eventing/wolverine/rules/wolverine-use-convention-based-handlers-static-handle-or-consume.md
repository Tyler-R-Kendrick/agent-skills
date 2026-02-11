---
title: "Use convention-based handlers (static `Handle` or `Consume`..."
impact: MEDIUM
impactDescription: "general best practice"
tags: wolverine, dotnet, eventing, command-and-event-handling, messaging-with-rabbitmqazure-service-busamazon-sqs, http-endpoint-generation
---

## Use convention-based handlers (static `Handle` or `Consume`...

Use convention-based handlers (static `Handle` or `Consume` methods) rather than implementing interfaces; Wolverine discovers them automatically and generates optimized dispatch code.
