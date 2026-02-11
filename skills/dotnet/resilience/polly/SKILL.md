---
name: polly
description: >
  USE FOR: Implementing resilience patterns (retry, circuit breaker, timeout, fallback, hedging,
  rate limiter) using Polly v8's ResiliencePipeline API for transient fault handling in .NET.
  DO NOT USE FOR: Application-level validation errors, permanent failures that should not be
  retried, or infrastructure-level resilience (use load balancers, service mesh).
license: MIT
metadata:
  displayName: Polly
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Polly Documentation"
    url: "https://www.pollydocs.org/"
  - title: "Polly GitHub Repository"
    url: "https://github.com/App-vNext/Polly"
  - title: "Polly NuGet Package"
    url: "https://www.nuget.org/packages/Polly"
---

# Polly

## Overview

Polly is the de facto resilience and transient fault-handling library for .NET. Version 8 introduced a new `ResiliencePipeline` API that replaces the legacy Policy API with a composable, high-performance pipeline model. Resilience strategies are added to a pipeline builder and executed in order, with the innermost strategy closest to the protected operation.

Polly v8 strategies include: Retry, Circuit Breaker, Timeout, Rate Limiter, Hedging, and Fallback. Pipelines can be generic (`ResiliencePipeline<T>`) for typed results or non-generic (`ResiliencePipeline`) for void operations. Polly integrates with `Microsoft.Extensions.Resilience` for DI registration and with `Microsoft.Extensions.Http.Resilience` for HttpClient resilience.

## Installation

```bash
dotnet add package Polly.Core              # Core pipeline API
dotnet add package Polly.Extensions        # DI integration
dotnet add package Polly.RateLimiting      # Rate limiter strategy
```

## Retry Strategy

```csharp
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Polly;
using Polly.Retry;

namespace MyApp.Resilience;

public class RetryExamples
{
    // Simple retry with exponential backoff and jitter
    public ResiliencePipeline CreateRetryPipeline()
    {
        return new ResiliencePipelineBuilder()
            .AddRetry(new RetryStrategyOptions
            {
                MaxRetryAttempts = 3,
                Delay = TimeSpan.FromMilliseconds(500),
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true,
                ShouldHandle = new PredicateBuilder()
                    .Handle<HttpRequestException>()
                    .Handle<TimeoutException>(),
                OnRetry = args =>
                {
                    Console.WriteLine(
                        $"Retry {args.AttemptNumber}/{3} after " +
                        $"{args.RetryDelay.TotalMilliseconds}ms due to: " +
                        $"{args.Outcome.Exception?.Message}");
                    return ValueTask.CompletedTask;
                }
            })
            .Build();
    }

    // Typed retry for HTTP responses
    public ResiliencePipeline<HttpResponseMessage> CreateHttpRetryPipeline()
    {
        return new ResiliencePipelineBuilder<HttpResponseMessage>()
            .AddRetry(new RetryStrategyOptions<HttpResponseMessage>
            {
                MaxRetryAttempts = 3,
                Delay = TimeSpan.FromSeconds(1),
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true,
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .HandleResult(response =>
                        response.StatusCode is
                            System.Net.HttpStatusCode.TooManyRequests or
                            System.Net.HttpStatusCode.ServiceUnavailable or
                            System.Net.HttpStatusCode.GatewayTimeout)
            })
            .Build();
    }
}
```

## Circuit Breaker Strategy

```csharp
using System;
using System.Net.Http;
using Polly;
using Polly.CircuitBreaker;

namespace MyApp.Resilience;

public class CircuitBreakerExamples
{
    public ResiliencePipeline CreateCircuitBreaker()
    {
        return new ResiliencePipelineBuilder()
            .AddCircuitBreaker(new CircuitBreakerStrategyOptions
            {
                // Trip after 50% of requests fail
                FailureRatio = 0.5,

                // Evaluate failures over a 30-second window
                SamplingDuration = TimeSpan.FromSeconds(30),

                // Need at least 10 requests before evaluating
                MinimumThroughput = 10,

                // Stay open for 15 seconds before testing
                BreakDuration = TimeSpan.FromSeconds(15),

                ShouldHandle = new PredicateBuilder()
                    .Handle<HttpRequestException>()
                    .Handle<TimeoutException>(),

                OnOpened = args =>
                {
                    Console.WriteLine(
                        $"Circuit OPENED for {args.BreakDuration.TotalSeconds}s. " +
                        $"Failure ratio exceeded threshold.");
                    return ValueTask.CompletedTask;
                },
                OnClosed = args =>
                {
                    Console.WriteLine("Circuit CLOSED. Service recovered.");
                    return ValueTask.CompletedTask;
                },
                OnHalfOpened = args =>
                {
                    Console.WriteLine("Circuit HALF-OPEN. Testing with next request.");
                    return ValueTask.CompletedTask;
                }
            })
            .Build();
    }
}
```

## Timeout Strategy

```csharp
using System;
using Polly;
using Polly.Timeout;

namespace MyApp.Resilience;

public class TimeoutExamples
{
    // Optimistic timeout (cooperative via CancellationToken)
    public ResiliencePipeline CreateOptimisticTimeout()
    {
        return new ResiliencePipelineBuilder()
            .AddTimeout(new TimeoutStrategyOptions
            {
                Timeout = TimeSpan.FromSeconds(5),
                OnTimeout = args =>
                {
                    Console.WriteLine(
                        $"Operation timed out after {args.Timeout.TotalSeconds}s");
                    return ValueTask.CompletedTask;
                }
            })
            .Build();
    }

    // Shorthand
    public ResiliencePipeline CreateSimpleTimeout()
    {
        return new ResiliencePipelineBuilder()
            .AddTimeout(TimeSpan.FromSeconds(10))
            .Build();
    }
}
```

## Fallback Strategy

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Polly;
using Polly.Fallback;

namespace MyApp.Resilience;

public class FallbackExamples
{
    public ResiliencePipeline<UserProfile> CreateFallbackPipeline()
    {
        return new ResiliencePipelineBuilder<UserProfile>()
            .AddFallback(new FallbackStrategyOptions<UserProfile>
            {
                ShouldHandle = new PredicateBuilder<UserProfile>()
                    .Handle<HttpRequestException>()
                    .Handle<TimeoutException>()
                    .HandleResult(r => r is null),
                FallbackAction = args =>
                {
                    Console.WriteLine(
                        $"Fallback activated due to: {args.Outcome.Exception?.Message ?? "null result"}");
                    var fallback = new UserProfile("Guest", "guest@example.com");
                    return Outcome.FromResultAsValueTask(fallback);
                }
            })
            .Build();
    }
}

public record UserProfile(string Name, string Email);
```

## Hedging Strategy

```csharp
using System;
using System.Net.Http;
using Polly;
using Polly.Hedging;

namespace MyApp.Resilience;

public class HedgingExamples
{
    // Send parallel requests and return first success
    public ResiliencePipeline<HttpResponseMessage> CreateHedgingPipeline()
    {
        return new ResiliencePipelineBuilder<HttpResponseMessage>()
            .AddHedging(new HedgingStrategyOptions<HttpResponseMessage>
            {
                MaxHedgedAttempts = 2,
                Delay = TimeSpan.FromMilliseconds(500),
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .HandleResult(r => !r.IsSuccessStatusCode)
            })
            .Build();
    }
}
```

## Composing a Full Pipeline

```csharp
using System;
using System.Net.Http;
using Polly;
using Polly.CircuitBreaker;
using Polly.Retry;
using Polly.Timeout;

namespace MyApp.Resilience;

public static class ResiliencePipelines
{
    /// <summary>
    /// Creates a production-ready resilience pipeline for external API calls.
    /// Strategy order (outermost to innermost):
    /// 1. Total timeout (caps entire operation)
    /// 2. Retry (retries on transient failures)
    /// 3. Circuit breaker (prevents cascading failures)
    /// 4. Per-attempt timeout (caps individual attempts)
    /// </summary>
    public static ResiliencePipeline<HttpResponseMessage> CreateExternalApiPipeline()
    {
        return new ResiliencePipelineBuilder<HttpResponseMessage>()
            // 1. Total timeout: 30 seconds for the entire operation
            .AddTimeout(new TimeoutStrategyOptions
            {
                Timeout = TimeSpan.FromSeconds(30),
                OnTimeout = args =>
                {
                    Console.WriteLine("Total operation timeout exceeded");
                    return ValueTask.CompletedTask;
                }
            })
            // 2. Retry: 3 attempts with exponential backoff
            .AddRetry(new RetryStrategyOptions<HttpResponseMessage>
            {
                MaxRetryAttempts = 3,
                Delay = TimeSpan.FromSeconds(1),
                BackoffType = DelayBackoffType.Exponential,
                UseJitter = true,
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .Handle<TimeoutRejectedException>()
                    .HandleResult(r => r.StatusCode is
                        System.Net.HttpStatusCode.TooManyRequests or
                        System.Net.HttpStatusCode.ServiceUnavailable)
            })
            // 3. Circuit breaker: trip after sustained failures
            .AddCircuitBreaker(new CircuitBreakerStrategyOptions<HttpResponseMessage>
            {
                FailureRatio = 0.5,
                SamplingDuration = TimeSpan.FromSeconds(30),
                MinimumThroughput = 10,
                BreakDuration = TimeSpan.FromSeconds(15),
                ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                    .Handle<HttpRequestException>()
                    .Handle<TimeoutRejectedException>()
            })
            // 4. Per-attempt timeout: 5 seconds per try
            .AddTimeout(TimeSpan.FromSeconds(5))
            .Build();
    }
}
```

## Using the Pipeline

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using Polly;

namespace MyApp.Services;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly ResiliencePipeline<HttpResponseMessage> _pipeline;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _pipeline = Resilience.ResiliencePipelines.CreateExternalApiPipeline();
    }

    public async Task<WeatherForecast?> GetForecastAsync(
        string city, CancellationToken ct)
    {
        var response = await _pipeline.ExecuteAsync(async token =>
        {
            return await _httpClient.GetAsync($"/api/weather/{city}", token);
        }, ct);

        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadFromJsonAsync<WeatherForecast>(ct);
        }

        return null;
    }
}

public record WeatherForecast(string City, double Temperature, string Condition);
```

## Backoff Type Comparison

| Backoff Type   | Delay Pattern                           | Use Case                              |
|----------------|-----------------------------------------|---------------------------------------|
| `Constant`     | Same delay every retry                  | Internal services with stable latency |
| `Linear`       | Delay increases by fixed amount         | Moderate backoff for batch jobs       |
| `Exponential`  | Delay doubles each retry (1s, 2s, 4s)   | External APIs, rate-limited services  |
| + `UseJitter`  | Adds random spread to any backoff       | Prevents thundering herd on recovery  |

## Polly v8 vs. Polly v7 (Legacy)

| Aspect                | Polly v8 (Current)                    | Polly v7 (Legacy)                  |
|-----------------------|---------------------------------------|------------------------------------|
| API style             | `ResiliencePipelineBuilder`           | `Policy.Handle<T>().RetryAsync()`  |
| Composition           | `pipeline.AddRetry().AddTimeout()`    | `Policy.WrapAsync(p1, p2)`        |
| DI integration        | Built-in via Extensions.Resilience    | Manual registration                |
| Telemetry             | OpenTelemetry built-in                | Manual event callbacks             |
| Performance           | Allocation-free hot path              | Delegate allocations per execution |
| Thread safety         | Immutable after Build()               | Mutable policy state               |
| Hedging               | Built-in strategy                     | Not available                      |
| Rate limiting         | Built-in (System.Threading.RateLimiting) | Bulkhead (semaphore only)       |

## Best Practices

1. **Use Polly v8's `ResiliencePipelineBuilder` API exclusively** and do not mix it with the legacy v7 `Policy` API; v8 pipelines are allocation-free on the hot path and provide built-in telemetry that v7 policies do not.

2. **Always enable `UseJitter = true` on retry strategies** to add randomized spread to retry delays, preventing synchronized retry storms when many clients recover from the same outage simultaneously.

3. **Add strategies in order from outermost to innermost: total timeout, retry, circuit breaker, attempt timeout** so that the total timeout caps the entire operation, retries wrap the circuit breaker, and the attempt timeout applies to each individual call.

4. **Use `PredicateBuilder` with `Handle<TException>()` and `HandleResult()` to explicitly define which failures trigger resilience strategies** rather than catching all exceptions, which would retry permanent failures like `ArgumentException` or `AuthenticationException`.

5. **Set `MinimumThroughput` on circuit breakers to at least 10** to prevent the circuit from tripping during low-traffic periods where a single failure could exceed the failure ratio; this ensures statistical significance.

6. **Build pipelines once and reuse them** because `ResiliencePipeline` instances are thread-safe and immutable after `Build()` is called; creating a new pipeline per request wastes resources and bypasses circuit breaker state.

7. **Use the `OnRetry`, `OnOpened`, `OnClosed` lifecycle callbacks for logging and metrics** rather than wrapping pipeline execution in try/catch blocks, because the callbacks receive structured context (`AttemptNumber`, `RetryDelay`, `BreakDuration`) that is not available in catch blocks.

8. **Handle `BrokenCircuitException` and `TimeoutRejectedException` at the caller level** to provide meaningful error messages or fallback responses when the circuit is open or the operation times out, rather than letting these propagate as unhandled exceptions.

9. **Prefer `Microsoft.Extensions.Http.Resilience` with `AddStandardResilienceHandler` for HttpClient resilience** over manually constructing Polly pipelines, because the standard handler provides Microsoft-tested defaults and integrates with `IHttpClientFactory` lifecycle management.

10. **Test resilience pipelines by injecting controlled failures** using a test `DelegatingHandler` that returns HTTP 503 or throws `HttpRequestException` on specific calls to verify that retry counts, circuit breaker transitions, and timeout behavior work as configured.
