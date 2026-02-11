---
title: "Use `PowerOfTwoChoices` load balancing"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: yarp, dotnet, web, building-high-performance-reverse-proxies, api-gateways, and-load-balancers-using-yarp-yet-another-reverse-proxy-from-microsoft-use-when-you-need-customizable-request-routing
---

## Use `PowerOfTwoChoices` load balancing

Use `PowerOfTwoChoices` load balancing: for most production scenarios instead of `RoundRobin`, because it selects the least-loaded destination from two randomly chosen candidates, providing better distribution than round-robin when destination response times vary without the overhead of tracking all destination loads.
