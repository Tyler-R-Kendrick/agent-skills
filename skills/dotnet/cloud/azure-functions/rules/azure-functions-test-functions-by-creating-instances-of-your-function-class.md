---
title: "Test functions by creating instances of your function class..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Test functions by creating instances of your function class...

Test functions by creating instances of your function class directly and passing mock services through constructor injection; use `HttpRequestData` or test doubles for trigger inputs.
