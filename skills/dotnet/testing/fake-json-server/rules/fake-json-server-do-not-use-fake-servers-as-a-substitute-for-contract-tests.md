---
title: "Do not use fake servers as a substitute for contract tests"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fake-json-server, dotnet, testing, mocking-rest-apis-during-development, creating-stub-http-endpoints-for-integration-tests, simulating-third-party-api-responses
---

## Do not use fake servers as a substitute for contract tests

Do not use fake servers as a substitute for contract tests: fake servers validate your code's behavior against assumed responses; use Pact to validate that the real API actually matches those assumptions.
