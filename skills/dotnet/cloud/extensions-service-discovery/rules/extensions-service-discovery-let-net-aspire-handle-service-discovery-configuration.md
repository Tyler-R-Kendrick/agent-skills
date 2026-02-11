---
title: "Let .NET Aspire handle service discovery configuration..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Let .NET Aspire handle service discovery configuration...

Let .NET Aspire handle service discovery configuration automatically via `WithReference()` in the AppHost rather than manually configuring endpoints in `appsettings.json` for Aspire-orchestrated applications.
