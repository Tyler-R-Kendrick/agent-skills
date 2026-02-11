---
title: "Order strategies from outermost (total timeout) to innermost (attempt timeout)"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Order strategies from outermost (total timeout) to innermost (attempt timeout)

Order strategies from outermost (total timeout) to innermost (attempt timeout): so that the total timeout caps the entire operation including retries, while the attempt timeout applies to each individual attempt.
