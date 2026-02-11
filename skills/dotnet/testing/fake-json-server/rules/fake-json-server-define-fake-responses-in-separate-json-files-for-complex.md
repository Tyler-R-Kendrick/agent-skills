---
title: "Define fake responses in separate JSON files for complex payloads"
impact: MEDIUM
impactDescription: "general best practice"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Define fake responses in separate JSON files for complex payloads

Define fake responses in separate JSON files for complex payloads: keep test data in `TestData/*.json` files rather than inline string literals to improve readability and allow reuse.
