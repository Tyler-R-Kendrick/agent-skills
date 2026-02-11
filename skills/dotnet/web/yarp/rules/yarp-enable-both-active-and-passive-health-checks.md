---
title: "Enable both active and passive health checks"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Enable both active and passive health checks

Enable both active and passive health checks: on clusters with multiple destinations, setting `Active.Enabled = true` with a health endpoint path and `Passive.Enabled = true` with `TransportFailureRate` policy, so that unhealthy destinations are detected both proactively (periodic probes) and reactively (failed request responses).
