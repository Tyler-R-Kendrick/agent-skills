---
title: "Set the attempt timeout shorter than the total timeout divided by (retry count + 1)"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-resilience, dotnet, resilience, configuring-resilience-pipelines-using-microsoftextensionsresilience-for-retries, timeouts, circuit-breakers
---

## Set the attempt timeout shorter than the total timeout divided by (retry count + 1)

Set the attempt timeout shorter than the total timeout divided by (retry count + 1): to ensure retries have time to execute; for example, with 3 retries and a 30s total timeout, set the attempt timeout to at most 5-7 seconds.
