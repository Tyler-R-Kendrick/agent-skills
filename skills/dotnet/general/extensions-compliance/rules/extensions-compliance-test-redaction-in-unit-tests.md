---
title: "Test redaction in unit tests"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-compliance, dotnet, general, classifying-sensitive-data-pii, euii, financial
---

## Test redaction in unit tests

Test redaction in unit tests: by resolving `IRedactorProvider` from a test service provider and verifying that classified values are transformed correctly.
