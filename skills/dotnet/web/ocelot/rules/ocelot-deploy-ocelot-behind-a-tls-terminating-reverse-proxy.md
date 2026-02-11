---
title: "Deploy Ocelot behind a TLS-terminating reverse proxy"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Deploy Ocelot behind a TLS-terminating reverse proxy

(NGINX, Azure Application Gateway) and configure `GlobalConfiguration.BaseUrl` to match the public-facing URL, so that rate-limit headers, redirect URLs, and HATEOAS links reference the correct external address rather than the gateway's internal address.
