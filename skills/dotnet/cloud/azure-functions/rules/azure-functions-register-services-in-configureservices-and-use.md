---
title: "Register services in `ConfigureServices` and use..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Register services in `ConfigureServices` and use...

Register services in `ConfigureServices` and use constructor injection in function classes rather than creating instances manually; function classes support the same DI patterns as ASP.NET Core controllers.
