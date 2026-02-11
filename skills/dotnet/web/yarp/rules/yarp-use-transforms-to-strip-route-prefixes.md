---
title: "Use transforms to strip route prefixes"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Use transforms to strip route prefixes

Use transforms to strip route prefixes: with `PathRemovePrefix` and add forwarded headers with `RequestHeader` transforms, rather than modifying backend services to handle gateway prefixes, because transforms keep backend services unaware of the gateway's URL structure.
