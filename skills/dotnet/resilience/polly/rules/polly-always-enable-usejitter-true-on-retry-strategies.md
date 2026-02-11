---
title: "Always enable `UseJitter = true` on retry strategies"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Always enable `UseJitter = true` on retry strategies

Always enable `UseJitter = true` on retry strategies: to add randomized spread to retry delays, preventing synchronized retry storms when many clients recover from the same outage simultaneously.
