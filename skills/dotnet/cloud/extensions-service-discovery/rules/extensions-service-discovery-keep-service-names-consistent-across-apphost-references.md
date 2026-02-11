---
title: "Keep service names consistent across AppHost references,..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Keep service names consistent across AppHost references,...

Keep service names consistent across AppHost references, configuration keys, and `HttpClient.BaseAddress` URIs (e.g., always use `catalog-api`, not `CatalogAPI` or `catalog_api`) to prevent resolution failures.
