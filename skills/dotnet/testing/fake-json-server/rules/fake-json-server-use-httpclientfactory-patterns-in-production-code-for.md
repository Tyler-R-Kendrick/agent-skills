---
title: "Use `HttpClientFactory` patterns in production code for testability"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Use `HttpClientFactory` patterns in production code for testability

Use `HttpClientFactory` patterns in production code for testability: register named or typed HTTP clients so tests can replace the handler without changing business logic.
