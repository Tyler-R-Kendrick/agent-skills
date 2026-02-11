---
title: "Use `PredicateBuilder` with `Handle<TException>()` and `HandleResult()` to explicitly define which failures trigger resilience strategies"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Use `PredicateBuilder` with `Handle<TException>()` and `HandleResult()` to explicitly define which failures trigger resilience strategies

Use `PredicateBuilder` with `Handle<TException>()` and `HandleResult()` to explicitly define which failures trigger resilience strategies: rather than catching all exceptions, which would retry permanent failures like `ArgumentException` or `AuthenticationException`.
