---
title: "Use `RouteClaimsRequirement` on routes that need role-based access control"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Use `RouteClaimsRequirement` on routes that need role-based access control

(e.g., `"role": "admin"`) to reject unauthorized requests at the gateway rather than in downstream services, centralizing authorization policy and preventing unauthenticated traffic from reaching internal services.
