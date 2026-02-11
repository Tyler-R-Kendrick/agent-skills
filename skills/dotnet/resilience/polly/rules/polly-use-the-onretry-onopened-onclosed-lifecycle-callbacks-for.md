---
title: "Use the `OnRetry`, `OnOpened`, `OnClosed` lifecycle callbacks for logging and metrics"
impact: MEDIUM
impactDescription: "general best practice"
tags: polly, dotnet, resilience, implementing-resilience-patterns-retry, circuit-breaker, timeout
---

## Use the `OnRetry`, `OnOpened`, `OnClosed` lifecycle callbacks for logging and metrics

Use the `OnRetry`, `OnOpened`, `OnClosed` lifecycle callbacks for logging and metrics: rather than wrapping pipeline execution in try/catch blocks, because the callbacks receive structured context (`AttemptNumber`, `RetryDelay`, `BreakDuration`) that is not available in catch blocks.
