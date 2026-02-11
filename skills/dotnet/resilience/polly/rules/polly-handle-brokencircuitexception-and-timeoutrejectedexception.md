---
title: "Handle `BrokenCircuitException` and `TimeoutRejectedException` at the caller level"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Handle `BrokenCircuitException` and `TimeoutRejectedException` at the caller level

Handle `BrokenCircuitException` and `TimeoutRejectedException` at the caller level: to provide meaningful error messages or fallback responses when the circuit is open or the operation times out, rather than letting these propagate as unhandled exceptions.
