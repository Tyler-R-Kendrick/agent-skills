---
title: "Configure `MaxRequestBodySize` and timeouts on routes"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Configure `MaxRequestBodySize` and timeouts on routes

Configure `MaxRequestBodySize` and timeouts on routes: that proxy file uploads or long-running operations, because the default Kestrel limits (30 MB body, 30-second timeout) may be too restrictive for large file uploads or too generous for API calls, and mismatched timeouts cause confusing gateway errors.
