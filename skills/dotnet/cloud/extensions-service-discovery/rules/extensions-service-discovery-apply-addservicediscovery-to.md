---
title: "Apply `AddServiceDiscovery()` to..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Apply `AddServiceDiscovery()` to...

Apply `AddServiceDiscovery()` to `ConfigureHttpClientDefaults` to enable service discovery globally rather than adding it to each client individually, reducing boilerplate and preventing missed clients.
