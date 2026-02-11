---
title: "Define service endpoints in `appsettings"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Define service endpoints in `appsettings

Define service endpoints in `appsettings.json` under the `Services` key for development and testing environments, and use environment variables (`services__name__scheme__index`) for production deployments set by orchestrators.
