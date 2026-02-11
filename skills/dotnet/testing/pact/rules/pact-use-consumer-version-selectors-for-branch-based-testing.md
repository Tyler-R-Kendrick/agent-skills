---
title: "Use consumer version selectors for branch-based testing"
impact: MEDIUM
impactDescription: "general best practice"
tags: pact, dotnet, testing, consumer-driven-contract-testing, verifying-api-compatibility-between-microservices, preventing-breaking-api-changes
---

## Use consumer version selectors for branch-based testing

Use consumer version selectors for branch-based testing: configure `ConsumerVersionSelector` with `MainBranch = true` to verify against the latest consumer on the main branch.
