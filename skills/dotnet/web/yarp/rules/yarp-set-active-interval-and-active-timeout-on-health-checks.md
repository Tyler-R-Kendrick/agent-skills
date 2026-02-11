---
title: "Set `Active.Interval` and `Active.Timeout` on health checks"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Set `Active.Interval` and `Active.Timeout` on health checks

Set `Active.Interval` and `Active.Timeout` on health checks: to appropriate values for your environment (e.g., 15-second interval, 5-second timeout for local services; 30-second interval, 10-second timeout for remote services), because aggressive intervals increase health check traffic while long intervals delay detection of failed destinations.
