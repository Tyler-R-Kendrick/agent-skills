# Microsoft.Extensions.Resilience

## Overview

`Microsoft.Extensions.Resilience` provides a first-party integration between Polly v8 resilience pipelines and the Microsoft.Extensions ecosystem (dependency injection, configuration, telemetry). It builds on Polly's `ResiliencePipeline` abstraction and adds opinionated defaults, `IServiceCollection` registration, `IHttpClientFactory` integration, and OpenTelemetry-compatible metrics and tracing out of the box.

The package defines two primary entry points: `AddResiliencePipeline` for general-purpose resilience pipelines, and `AddStandardResilienceHandler` / `AddStandardHedgingHandler` for HTTP-specific resilience with pre-configured defaults. Resilience strategies include retry, timeout, circuit breaker, rate limiter, hedging, and fallback.

## Installation

```bash
dotnet add package Microsoft.Extensions.Resilience
dotnet add package Microsoft.Extensions.Http.Resilience  # For HttpClient integration
```

## Basic Pipeline Registration

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;
using Polly;

var builder = WebApplication.CreateBuilder(args);

// Register a named resilience pipeline
builder.Services.AddResiliencePipeline("catalog-api", pipeline =>
{
    pipeline
        .AddRetry(new Polly.Retry.RetryStrategyOptions
        {
            MaxRetryAttempts = 3,
            Delay = TimeSpan.FromMilliseconds(500),
            BackoffType = DelayBackoffType.Exponential,
            UseJitter = true,
            ShouldHandle = new PredicateBuilder()
                .Handle<HttpRequestException>()
                .Handle<TimeoutException>()
        })
        .AddTimeout(TimeSpan.FromSeconds(10))
        .AddCircuitBreaker(new Polly.CircuitBreaker.CircuitBreakerStrategyOptions
        {
            FailureRatio = 0.5,
            SamplingDuration = TimeSpan.FromSeconds(30),
            MinimumThroughput = 10,
            BreakDuration = TimeSpan.FromSeconds(15),
            ShouldHandle = new PredicateBuilder()
                .Handle<HttpRequestException>()
                .Handle<TimeoutException>()
        });
});

var app = builder.Build();
```

## Consuming Pipelines

```csharp
using System.Threading;
using System.Threading.Tasks;
using Polly;

namespace MyApp.Services;

public class CatalogService
{
    private readonly ResiliencePipeline _pipeline;
    private readonly HttpClient _httpClient;

    public CatalogService(
        ResiliencePipelineProvider<string> pipelineProvider,
        HttpClient httpClient)
    {
        _pipeline = pipelineProvider.GetPipeline("catalog-api");
        _httpClient = httpClient;
    }

    public async Task<CatalogItem[]> GetItemsAsync(CancellationToken ct)
    {
        return await _pipeline.ExecuteAsync(async token =>
        {
            var response = await _httpClient.GetAsync("/api/catalog", token);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<CatalogItem[]>(token)
                ?? Array.Empty<CatalogItem>();
        }, ct);
    }
}

public record CatalogItem(int Id, string Name, decimal Price);
```

## HttpClient Resilience (Standard Handler)

`AddStandardResilienceHandler` adds a pre-configured pipeline with retry, circuit breaker, and timeout strategies using Microsoft's recommended defaults.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;

var builder = WebApplication.CreateBuilder(args);

// Standard resilience handler with recommended defaults:
// - Total request timeout: 30s
// - Retry: 3 attempts, exponential backoff with jitter
// - Circuit breaker: 50% failure ratio, 30s sampling, 5s break
// - Attempt timeout: 10s per attempt
builder.Services.AddHttpClient("catalog-api", client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
})
.AddStandardResilienceHandler();

// Or with custom configuration
builder.Services.AddHttpClient("payment-api", client =>
{
    client.BaseAddress = new Uri("https://payments.example.com");
})
.AddStandardResilienceHandler(options =>
{
    options.Retry.MaxRetryAttempts = 2;
    options.Retry.Delay = TimeSpan.FromSeconds(1);
    options.AttemptTimeout.Timeout = TimeSpan.FromSeconds(5);
    options.CircuitBreaker.BreakDuration = TimeSpan.FromSeconds(30);
    options.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(20);
});

var app = builder.Build();
```

## Hedging Handler (Parallel Requests)

Hedging sends the same request to multiple endpoints simultaneously and returns the first successful response.

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;
using Polly;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("search-api", client =>
{
    client.BaseAddress = new Uri("https://search.example.com");
})
.AddStandardHedgingHandler(options =>
{
    options.Hedging.MaxHedgedAttempts = 2;
    options.Hedging.Delay = TimeSpan.FromMilliseconds(500);

    options.Endpoint.CircuitBreaker.BreakDuration = TimeSpan.FromSeconds(10);
    options.Endpoint.Timeout.Timeout = TimeSpan.FromSeconds(3);
    options.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(10);
});

var app = builder.Build();
```

## Typed Pipeline with Generic Key

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Polly;

namespace MyApp.Services;

// Use an enum for type-safe pipeline keys
public enum ResilienceKeys
{
    DatabaseRead,
    DatabaseWrite,
    ExternalApi,
    CacheAccess
}

// Registration
public static class ResilienceExtensions
{
    public static IServiceCollection AddAppResilience(this IServiceCollection services)
    {
        services.AddResiliencePipeline(ResilienceKeys.DatabaseRead, pipeline =>
        {
            pipeline
                .AddRetry(new Polly.Retry.RetryStrategyOptions
                {
                    MaxRetryAttempts = 2,
                    Delay = TimeSpan.FromMilliseconds(100),
                    BackoffType = DelayBackoffType.Constant
                })
                .AddTimeout(TimeSpan.FromSeconds(5));
        });

        services.AddResiliencePipeline(ResilienceKeys.ExternalApi, pipeline =>
        {
            pipeline
                .AddRetry(new Polly.Retry.RetryStrategyOptions
                {
                    MaxRetryAttempts = 3,
                    Delay = TimeSpan.FromMilliseconds(500),
                    BackoffType = DelayBackoffType.Exponential,
                    UseJitter = true
                })
                .AddCircuitBreaker(new Polly.CircuitBreaker.CircuitBreakerStrategyOptions
                {
                    FailureRatio = 0.3,
                    SamplingDuration = TimeSpan.FromSeconds(60),
                    MinimumThroughput = 20,
                    BreakDuration = TimeSpan.FromSeconds(30)
                })
                .AddTimeout(TimeSpan.FromSeconds(15));
        });

        return services;
    }
}

// Consumption
public class OrderRepository
{
    private readonly ResiliencePipeline _pipeline;

    public OrderRepository(ResiliencePipelineProvider<ResilienceKeys> provider)
    {
        _pipeline = provider.GetPipeline(ResilienceKeys.DatabaseRead);
    }

    public async Task<Order?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await _pipeline.ExecuteAsync(async token =>
        {
            // database call here
            await Task.Delay(10, token);
            return new Order(id, 99.99m);
        }, ct);
    }
}

public record Order(int Id, decimal Total);
```

## Configuration via appsettings.json

```json
{
  "ResilienceOptions": {
    "CatalogApi": {
      "Retry": {
        "MaxRetryAttempts": 3,
        "Delay": "00:00:00.500",
        "BackoffType": "Exponential"
      },
      "Timeout": {
        "Timeout": "00:00:10"
      },
      "CircuitBreaker": {
        "FailureRatio": 0.5,
        "SamplingDuration": "00:00:30",
        "BreakDuration": "00:00:15"
      }
    }
  }
}
```

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResiliencePipeline("catalog-api", (pipeline, context) =>
{
    var section = context.ServiceProvider
        .GetRequiredService<IConfiguration>()
        .GetSection("ResilienceOptions:CatalogApi");

    var retryOptions = new Polly.Retry.RetryStrategyOptions();
    section.GetSection("Retry").Bind(retryOptions);

    var timeoutOptions = new Polly.Timeout.TimeoutStrategyOptions();
    section.GetSection("Timeout").Bind(timeoutOptions);

    pipeline
        .AddRetry(retryOptions)
        .AddTimeout(timeoutOptions);
});
```

## Strategy Ordering

The order in which strategies are added to the pipeline matters. The outermost strategy is added first.

| Order | Strategy        | Purpose                                      |
|-------|-----------------|----------------------------------------------|
| 1     | Total Timeout   | Caps the total time across all retries        |
| 2     | Retry           | Retries failed attempts                       |
| 3     | Circuit Breaker | Stops requests when failure threshold reached |
| 4     | Attempt Timeout | Caps the time for a single attempt            |

```csharp
pipeline
    .AddTimeout(TimeSpan.FromSeconds(30))         // Total timeout (outermost)
    .AddRetry(new Polly.Retry.RetryStrategyOptions
    {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromSeconds(1)
    })
    .AddCircuitBreaker(new Polly.CircuitBreaker.CircuitBreakerStrategyOptions
    {
        FailureRatio = 0.5,
        SamplingDuration = TimeSpan.FromSeconds(30),
        MinimumThroughput = 10,
        BreakDuration = TimeSpan.FromSeconds(15)
    })
    .AddTimeout(TimeSpan.FromSeconds(5));          // Per-attempt timeout (innermost)
```

## Standard Handler Defaults

| Strategy         | Default Value                              |
|------------------|--------------------------------------------|
| Total Timeout    | 30 seconds                                 |
| Retry Attempts   | 3                                          |
| Retry Delay      | Exponential backoff with jitter (2s base)  |
| Circuit Breaker  | 50% failure ratio, 30s sampling, 5s break  |
| Attempt Timeout  | 10 seconds                                 |

## Best Practices

1. **Use `AddStandardResilienceHandler` for HttpClient resilience as the default** because it provides Microsoft's recommended pipeline ordering (total timeout, retry, circuit breaker, attempt timeout) with sensible defaults that cover most scenarios.

2. **Always add `UseJitter = true` to retry strategies** to spread retry bursts across time and prevent thundering herd problems when multiple clients retry simultaneously after a service outage.

3. **Order strategies from outermost (total timeout) to innermost (attempt timeout)** so that the total timeout caps the entire operation including retries, while the attempt timeout applies to each individual attempt.

4. **Set `MinimumThroughput` on circuit breakers to at least 10-20 requests** to prevent the circuit from tripping on a single failure during low-traffic periods when the failure ratio calculation has insufficient data.

5. **Use `AddStandardHedgingHandler` for latency-critical read operations** where sending parallel requests to multiple endpoints and taking the fastest response is acceptable; do not use hedging for write operations that are not idempotent.

6. **Configure resilience options through `appsettings.json` rather than hardcoding values** so that operations teams can tune retry counts, timeouts, and circuit breaker thresholds without redeploying the application.

7. **Use typed pipeline keys (enums or strongly-typed classes) with `AddResiliencePipeline<TKey>`** instead of magic strings to prevent typos and enable compile-time verification of pipeline names.

8. **Monitor resilience events using the built-in OpenTelemetry integration** by calling `builder.Services.AddOpenTelemetry()` with `AddMeter("Polly")` to track retry counts, circuit breaker state transitions, and timeout rates in your observability platform.

9. **Set the attempt timeout shorter than the total timeout divided by (retry count + 1)** to ensure retries have time to execute; for example, with 3 retries and a 30s total timeout, set the attempt timeout to at most 5-7 seconds.

10. **Do not wrap non-transient exceptions (ArgumentException, ValidationException) in retry strategies** -- use `ShouldHandle` predicates to retry only on transient faults like `HttpRequestException`, `TimeoutException`, and HTTP 429/503 status codes.
