---
title: "Verify request content in addition to response handling"
impact: MEDIUM
impactDescription: "general best practice"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Verify request content in addition to response handling

Verify request content in addition to response handling: use WireMock's `_server.LogEntries` or handler assertions to confirm your code sends correct request bodies, headers, and query parameters.
