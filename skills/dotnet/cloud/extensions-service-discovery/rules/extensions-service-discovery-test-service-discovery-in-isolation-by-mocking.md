---
title: "Test service discovery in isolation by mocking..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Test service discovery in isolation by mocking...

Test service discovery in isolation by mocking `IServiceEndpointProvider` or overriding configuration values in test fixtures to point at test servers, rather than relying on real service infrastructure during unit tests.
