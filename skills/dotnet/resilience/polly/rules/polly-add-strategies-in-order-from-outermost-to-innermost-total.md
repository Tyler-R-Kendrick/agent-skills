---
title: "Add strategies in order from outermost to innermost: total timeout, retry, circuit breaker, attempt timeout"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Add strategies in order from outermost to innermost: total timeout, retry, circuit breaker, attempt timeout

Add strategies in order from outermost to innermost: total timeout, retry, circuit breaker, attempt timeout: so that the total timeout caps the entire operation, retries wrap the circuit breaker, and the attempt timeout applies to each individual call.
