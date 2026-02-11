---
title: "Separate internal services (using service discovery) from..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Separate internal services (using service discovery) from...

Separate internal services (using service discovery) from external APIs (using static URLs) by applying `AddServiceDiscovery()` per-client rather than globally when your application calls both internal and third-party APIs.
