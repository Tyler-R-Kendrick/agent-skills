---
title: "Always add `UseJitter = true` to retry strategies"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Always add `UseJitter = true` to retry strategies

Always add `UseJitter = true` to retry strategies: to spread retry bursts across time and prevent thundering herd problems when multiple clients retry simultaneously after a service outage.
