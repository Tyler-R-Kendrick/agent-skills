---
title: "Use `[QueueOutput]` and `[BlobOutput]` attributes for..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Use `[QueueOutput]` and `[BlobOutput]` attributes for...

Use `[QueueOutput]` and `[BlobOutput]` attributes for output bindings rather than creating SDK clients manually, which reduces boilerplate and leverages the runtime's connection management.
