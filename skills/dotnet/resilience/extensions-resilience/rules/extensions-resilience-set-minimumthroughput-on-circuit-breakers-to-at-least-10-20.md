---
title: "Set `MinimumThroughput` on circuit breakers to at least 10-20 requests"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Set `MinimumThroughput` on circuit breakers to at least 10-20 requests

Set `MinimumThroughput` on circuit breakers to at least 10-20 requests: to prevent the circuit from tripping on a single failure during low-traffic periods when the failure ratio calculation has insufficient data.
