---
title: "Use `https+http"
impact: LOW
impactDescription: "recommended but situational"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Use `https+http

Use `https+http://` as the default URI scheme for internal services to prefer HTTPS when available while gracefully falling back to HTTP during local development where TLS certificates may not be configured.
