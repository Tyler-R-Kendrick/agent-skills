---
title: "Split route configuration into environment-specific files"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Split route configuration into environment-specific files

Split route configuration into environment-specific files: using `AddJsonFile($"ocelot.{env.EnvironmentName}.json")` so that downstream host addresses differ between development (localhost), staging (internal DNS), and production (service mesh addresses) without modifying shared route definitions.
