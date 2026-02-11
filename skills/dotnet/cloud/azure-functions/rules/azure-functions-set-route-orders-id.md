---
title: "Set `Route = \"orders/{id"
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Set `Route = "orders/{id

Set `Route = "orders/{id:int}"` on HTTP triggers with route constraints to get type-safe parameter binding and clear URL patterns rather than parsing query strings manually.
