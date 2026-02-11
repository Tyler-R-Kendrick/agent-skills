---
title: "Deploy YARP with Kestrel in process"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Deploy YARP with Kestrel in process

Deploy YARP with Kestrel in process: rather than behind IIS in-process hosting for maximum performance, because YARP's proxy pipeline directly accesses Kestrel's HTTP/2 and connection pooling capabilities; when deploying behind IIS, configure `ForwardedHeaders` middleware to preserve the original client IP and scheme.
