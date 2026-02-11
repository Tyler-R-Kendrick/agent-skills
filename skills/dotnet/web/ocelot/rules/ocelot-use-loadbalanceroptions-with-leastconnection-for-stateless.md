---
title: "Use `LoadBalancerOptions` with `LeastConnection` for stateless services"
impact: MEDIUM
impactDescription: "general best practice"
tags: ocelot, dotnet, web, building-api-gateways-in-net-using-ocelot-for-microservices-architectures-use-when-you-need-request-routing, load-balancing, rate-limiting
---

## Use `LoadBalancerOptions` with `LeastConnection` for stateless services

Use `LoadBalancerOptions` with `LeastConnection` for stateless services: that have variable response times, and `RoundRobin` for services with consistent latency, listing multiple `DownstreamHostAndPorts` entries per route to distribute traffic without an external load balancer.
