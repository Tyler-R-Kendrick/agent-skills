---
title: "Test only the contract, not business logic"
impact: MEDIUM
impactDescription: "general best practice"
tags: pact, dotnet, testing, consumer-driven-contract-testing, verifying-api-compatibility-between-microservices, preventing-breaking-api-changes
---

## Test only the contract, not business logic

Pact tests should verify request/response shapes, status codes, and field types, not complex business calculations.
