---
title: "Run `can-i-deploy` before every deployment"
impact: MEDIUM
impactDescription: "general best practice"
tags: pact, dotnet, testing, consumer-driven-contract-testing, verifying-api-compatibility-between-microservices, preventing-breaking-api-changes
---

## Run `can-i-deploy` before every deployment

Run `can-i-deploy` before every deployment: integrate the Pact CLI `can-i-deploy` check into your CI/CD pipeline to block deployments when contracts are incompatible.
