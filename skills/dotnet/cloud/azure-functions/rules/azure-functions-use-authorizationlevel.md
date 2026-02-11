---
title: "Use `AuthorizationLevel"
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Use `AuthorizationLevel

Use `AuthorizationLevel.Function` for API endpoints that need key-based access control, and `AuthorizationLevel.Anonymous` only for public endpoints or when using a reverse proxy (API Management, Front Door) that handles auth.
