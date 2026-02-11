---
title: "Isolate each test class with its own fake server port"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Isolate each test class with its own fake server port

Isolate each test class with its own fake server port: avoid port conflicts by letting WireMock auto-assign ports with `WireMockServer.Start()` instead of specifying fixed ports.
