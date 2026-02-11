---
title: "Combine service discovery with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Combine service discovery with...

Combine service discovery with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience` to get retries, circuit breakers, and timeouts on resolved endpoints rather than implementing retry logic manually.
