---
title: "Use provider states to set up test prerequisites"
impact: MEDIUM
impactDescription: "general best practice"
tags: pact, dotnet, testing, consumer-driven-contract-testing, verifying-api-compatibility-between-microservices, preventing-breaking-api-changes
---

## Use provider states to set up test prerequisites

Use provider states to set up test prerequisites: define `Given("user 1 exists")` states so the provider can seed data before each interaction is verified.
