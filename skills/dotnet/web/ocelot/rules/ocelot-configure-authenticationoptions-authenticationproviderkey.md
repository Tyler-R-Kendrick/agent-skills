---
title: "Configure `AuthenticationOptions.AuthenticationProviderKey` on routes that require authentication"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Configure `AuthenticationOptions.AuthenticationProviderKey` on routes that require authentication

Configure `AuthenticationOptions.AuthenticationProviderKey` on routes that require authentication: and register the corresponding JWT bearer scheme in `Program.cs`, so that Ocelot validates tokens at the gateway before forwarding requests, reducing load on downstream services that would otherwise validate tokens independently.
