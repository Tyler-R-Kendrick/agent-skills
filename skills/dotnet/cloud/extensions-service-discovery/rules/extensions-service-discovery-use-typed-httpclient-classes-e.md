---
title: "Use typed `HttpClient` classes (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-service-discovery, dotnet, cloud, resolving-service-urls-from-configuration-or-dns-instead-of-hardcoding, service-discovery-in-net-aspire-applications, load-balanced-httpclient-endpoint-resolution
---

## Use typed `HttpClient` classes (e

Use typed `HttpClient` classes (e.g., `CatalogClient`, `PaymentClient`) with constructor-injected `HttpClient` rather than `IHttpClientFactory.CreateClient("name")` to get compile-time safety and encapsulated API logic.
