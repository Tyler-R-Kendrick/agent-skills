---
title: "Use the isolated worker model..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Use the isolated worker model...

Use the isolated worker model (`ConfigureFunctionsWebApplication`) for all new .NET 8+ projects; the in-process model is deprecated and does not support .NET 8+.
