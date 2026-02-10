---
description: Guidance for Polly resilience and transient fault handling library.
metadata:
  displayName: Polly
---

# Polly

## Overview
Polly is a resilience and transient-fault-handling library providing retry, circuit breaker, timeout, and fallback policies.

## Example
```csharp
using Polly;

// Retry policy
var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, 
        retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

// Circuit breaker
var circuitBreaker = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 3,
        durationOfBreak: TimeSpan.FromMinutes(1));

// Usage
await retryPolicy.ExecuteAsync(async () => 
    await httpClient.GetAsync(url));
```

## Best Practices
- Combine policies with PolicyWrap
- Use circuit breakers for remote calls
- Configure appropriate timeouts
- Log policy events
- Use Polly.Extensions.Http for HttpClient
