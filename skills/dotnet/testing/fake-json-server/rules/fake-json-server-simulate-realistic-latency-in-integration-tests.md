---
title: "Simulate realistic latency in integration tests"
impact: MEDIUM
impactDescription: "general best practice"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Simulate realistic latency in integration tests

Simulate realistic latency in integration tests: add small delays (50-200ms) to fake responses to catch race conditions and timeout bugs that only appear with real network latency.
