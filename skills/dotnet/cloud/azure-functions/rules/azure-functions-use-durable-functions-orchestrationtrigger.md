---
title: "Use Durable Functions (`OrchestrationTrigger` +..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Use Durable Functions (`OrchestrationTrigger` +...

Use Durable Functions (`OrchestrationTrigger` + `ActivityTrigger`) for multi-step workflows that need reliable execution, rather than chaining queue messages between separate functions.
