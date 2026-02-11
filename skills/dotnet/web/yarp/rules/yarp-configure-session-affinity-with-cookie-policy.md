---
title: "Configure session affinity with `Cookie` policy"
impact: MEDIUM
impactDescription: "general best practice"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Configure session affinity with `Cookie` policy

Configure session affinity with `Cookie` policy: when backend services maintain in-memory session state (shopping carts, wizard flows), setting `AffinityKeyName` to a unique cookie name, so that subsequent requests from the same client are routed to the same destination for the duration of the session.
