---
title: "Enable Consul or Eureka service discovery for dynamic environments"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Enable Consul or Eureka service discovery for dynamic environments

(Kubernetes, Docker Swarm) where downstream service addresses change frequently, setting `ServiceName` on each route instead of hardcoding `DownstreamHostAndPorts`, so the gateway resolves healthy instances from the service registry at request time.
