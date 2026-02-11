---
title: "Use route ordering with `Order` property"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Use route ordering with `Order` property

Use route ordering with `Order` property: when multiple routes could match the same request path, because YARP evaluates routes in ascending order and stops at the first match; without explicit ordering, the matching route depends on configuration source order which may vary between deployments.
