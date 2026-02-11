---
title: "Set `MaxTimeout` on `RestClientOptions`"
impact: MEDIUM
impactDescription: "general best practice"
tags: restsharp, dotnet, web, making-http-api-calls-using-restsharps-fluent-request-builder-with-automatic-serialization, authenticators, and-response-handling-use-when-consuming-rest-apis-that-need-configurable-serialization
---

## Set `MaxTimeout` on `RestClientOptions`

Set `MaxTimeout` on `RestClientOptions`: to a value appropriate for the downstream service (e.g., 30 seconds for most APIs, 120 seconds for report generation endpoints) rather than using the default infinite timeout, because unresponsive downstream services will hold connections open indefinitely and exhaust the connection pool.
