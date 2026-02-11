---
title: "Dispose fake servers and HTTP clients in test teardown"
impact: MEDIUM
impactDescription: "general best practice"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Dispose fake servers and HTTP clients in test teardown

Dispose fake servers and HTTP clients in test teardown: implement `IAsyncLifetime` or `IDisposable` to stop WireMock servers and dispose HttpClient instances after each test class.
