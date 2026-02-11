---
title: "Add custom middleware to the proxy pipeline using `MapReverseProxy(pipeline => ...)`"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Add custom middleware to the proxy pipeline using `MapReverseProxy(pipeline => ...)`

Add custom middleware to the proxy pipeline using `MapReverseProxy(pipeline => ...)`: for cross-cutting concerns (logging, metrics, rate limiting, authentication validation), placing it before `UseLoadBalancing()` so it runs before destination selection and can short-circuit requests.
