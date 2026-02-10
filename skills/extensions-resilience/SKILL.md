---
description: Guidance for Microsoft.Extensions.Resilience pipelines.
metadata:
  displayName: Resilience
---

# Resilience

## Overview
Use resilience pipelines for retries, timeouts, circuit breakers, and hedging.

## Example
```csharp
builder.Services.AddResiliencePipeline("catalog", pipeline =>
{
	pipeline.AddRetry(new() { MaxRetryAttempts = 3 });
	pipeline.AddTimeout(TimeSpan.FromSeconds(5));
});

builder.Services.AddHttpClient("catalog")
	.AddResilienceHandler("catalog");
```

## Guidance
- Prefer per-client pipelines and explicit policies.
- Avoid unbounded retries and exponential delays without jitter.
