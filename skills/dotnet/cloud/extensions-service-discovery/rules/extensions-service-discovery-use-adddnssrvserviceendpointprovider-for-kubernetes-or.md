---
title: "Use `AddDnsSrvServiceEndpointProvider()` for Kubernetes or..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Use `AddDnsSrvServiceEndpointProvider()` for Kubernetes or...

Use `AddDnsSrvServiceEndpointProvider()` for Kubernetes or Consul environments where services are registered via DNS SRV records rather than duplicating endpoints in configuration files.
