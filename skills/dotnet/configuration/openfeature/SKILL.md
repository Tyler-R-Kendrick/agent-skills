---
name: openfeature
description: >
  USE FOR: Vendor-neutral feature flag evaluation, switching between flag providers (LaunchDarkly,
  Flagsmith, Split, CloudBees, in-memory) without code changes, standardized targeting and
  context-based evaluation, and multi-provider setups. DO NOT USE FOR: Simple compile-time
  feature toggles, runtime compatibility switches (use AppContext), or Microsoft-only ecosystems
  where Microsoft.FeatureManagement is already established.
license: MIT
metadata:
  displayName: "OpenFeature"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# OpenFeature

## Overview

OpenFeature is a CNCF (Cloud Native Computing Foundation) project that provides a vendor-neutral, community-driven API for feature flag evaluation. The .NET SDK (`OpenFeature`) defines a standard interface for evaluating boolean, string, integer, float, and object flags. Actual flag storage and evaluation logic is provided by a pluggable `FeatureProvider` -- the SDK ships with an `InMemoryProvider` for testing, and vendors like LaunchDarkly, Flagsmith, Split, and CloudBees publish their own providers.

The key benefit is portability: application code depends only on the OpenFeature API, and the backing provider can be swapped via configuration without changing business logic. The SDK also supports hooks for logging, metrics, and validation, evaluation context for user targeting, and events for provider readiness and configuration changes.

Install via NuGet: `dotnet add package OpenFeature`

## Basic Setup and Evaluation

```csharp
using OpenFeature;
using OpenFeature.Model;
using OpenFeature.Providers.Memory;

// Set up the provider (typically done once at startup)
var flagDefinitions = new Dictionary<string, Flag>
{
    { "new-checkout", new Flag<bool>(
        variants: new Dictionary<string, bool>
        {
            { "on", true },
            { "off", false }
        },
        defaultVariant: "on") },
    { "banner-text", new Flag<string>(
        variants: new Dictionary<string, string>
        {
            { "default", "Welcome!" },
            { "holiday", "Happy Holidays!" }
        },
        defaultVariant: "default") }
};

var provider = new InMemoryProvider(flagDefinitions);
await Api.Instance.SetProviderAsync(provider);

// Get a client and evaluate flags
FeatureClient client = Api.Instance.GetClient();

bool showNewCheckout = await client.GetBooleanValueAsync("new-checkout", false);
string bannerText = await client.GetStringValueAsync("banner-text", "Welcome!");
```

## Evaluation Context and Targeting

`EvaluationContext` carries user and environment information to the provider for targeted flag evaluation.

```csharp
using OpenFeature;
using OpenFeature.Model;

public sealed class FeatureFlagService
{
    private readonly FeatureClient _client;

    public FeatureFlagService()
    {
        _client = Api.Instance.GetClient("my-service", "1.0.0");
    }

    public async Task<bool> IsFeatureEnabledAsync(
        string flagKey,
        string userId,
        string? email = null,
        string? country = null)
    {
        var contextBuilder = EvaluationContext.Builder()
            .Set("targetingKey", userId)
            .Set("email", email ?? string.Empty)
            .Set("country", country ?? string.Empty);

        EvaluationContext context = contextBuilder.Build();

        return await _client.GetBooleanValueAsync(flagKey, false, context);
    }

    public async Task<FlagEvaluationDetails<bool>> GetFlagDetailsAsync(
        string flagKey,
        string userId)
    {
        var context = EvaluationContext.Builder()
            .Set("targetingKey", userId)
            .Build();

        // GetBooleanDetailsAsync returns metadata about the evaluation
        return await _client.GetBooleanDetailsAsync(flagKey, false, context);
    }
}
```

## ASP.NET Core Integration

Register OpenFeature in the DI container and use it in controllers and middleware.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using OpenFeature;
using OpenFeature.Providers.Memory;
using OpenFeature.Model;

var builder = WebApplication.CreateBuilder(args);

// Register OpenFeature
builder.Services.AddSingleton(Api.Instance);
builder.Services.AddSingleton<FeatureClient>(sp =>
{
    return Api.Instance.GetClient("web-api", "1.0.0");
});

var app = builder.Build();

// Set provider before handling requests
var flags = new Dictionary<string, Flag>
{
    { "premium-api", new Flag<bool>(
        variants: new Dictionary<string, bool> { { "on", true }, { "off", false } },
        defaultVariant: "off") }
};
await Api.Instance.SetProviderAsync(new InMemoryProvider(flags));

app.MapGet("/api/data", async (FeatureClient client, HttpContext httpContext) =>
{
    var context = EvaluationContext.Builder()
        .Set("targetingKey", httpContext.User.Identity?.Name ?? "anonymous")
        .Build();

    bool isPremium = await client.GetBooleanValueAsync("premium-api", false, context);

    if (isPremium)
    {
        return Results.Ok(new { Data = "Premium content", Tier = "premium" });
    }

    return Results.Ok(new { Data = "Standard content", Tier = "standard" });
});

app.Run();
```

## Hooks for Cross-Cutting Concerns

Hooks execute at defined stages of flag evaluation: before, after, error, and finally.

```csharp
using OpenFeature;
using OpenFeature.Model;
using Microsoft.Extensions.Logging;

public sealed class LoggingHook : Hook
{
    private readonly ILogger<LoggingHook> _logger;

    public LoggingHook(ILogger<LoggingHook> logger)
    {
        _logger = logger;
    }

    public override ValueTask<EvaluationContext> BeforeAsync<T>(
        HookContext<T> context,
        IReadOnlyDictionary<string, object>? hints = null,
        CancellationToken cancellationToken = default)
    {
        _logger.LogDebug(
            "Evaluating flag {FlagKey} of type {Type}",
            context.FlagKey,
            typeof(T).Name);

        return new ValueTask<EvaluationContext>(context.EvaluationContext);
    }

    public override ValueTask AfterAsync<T>(
        HookContext<T> context,
        FlagEvaluationDetails<T> details,
        IReadOnlyDictionary<string, object>? hints = null,
        CancellationToken cancellationToken = default)
    {
        _logger.LogDebug(
            "Flag {FlagKey} evaluated to variant {Variant} with value {Value}",
            context.FlagKey,
            details.Variant,
            details.Value);

        return default;
    }

    public override ValueTask ErrorAsync<T>(
        HookContext<T> context,
        Exception error,
        IReadOnlyDictionary<string, object>? hints = null,
        CancellationToken cancellationToken = default)
    {
        _logger.LogError(error, "Error evaluating flag {FlagKey}", context.FlagKey);
        return default;
    }
}
```

```csharp
// Register hooks
Api.Instance.AddHooks(new LoggingHook(loggerFactory.CreateLogger<LoggingHook>()));
```

## Custom Feature Provider

Implement `FeatureProvider` to integrate with your own flag storage.

```csharp
using OpenFeature;
using OpenFeature.Model;

public sealed class DatabaseFeatureProvider : FeatureProvider
{
    private readonly string _connectionString;

    public DatabaseFeatureProvider(string connectionString)
    {
        _connectionString = connectionString;
    }

    public override Metadata GetMetadata()
    {
        return new Metadata("DatabaseProvider");
    }

    public override Task<ResolutionDetails<bool>> ResolveBooleanValueAsync(
        string flagKey,
        bool defaultValue,
        EvaluationContext? context = null,
        CancellationToken cancellationToken = default)
    {
        // Query database for the flag value
        bool? value = QueryFlagFromDatabase(flagKey, context);

        if (value is null)
        {
            return Task.FromResult(new ResolutionDetails<bool>(
                flagKey, defaultValue, reason: "DEFAULT"));
        }

        return Task.FromResult(new ResolutionDetails<bool>(
            flagKey, value.Value, reason: "TARGETING_MATCH", variant: value.Value ? "on" : "off"));
    }

    public override Task<ResolutionDetails<string>> ResolveStringValueAsync(
        string flagKey,
        string defaultValue,
        EvaluationContext? context = null,
        CancellationToken cancellationToken = default)
    {
        // Implementation for string flags
        return Task.FromResult(new ResolutionDetails<string>(
            flagKey, defaultValue, reason: "DEFAULT"));
    }

    public override Task<ResolutionDetails<int>> ResolveIntegerValueAsync(
        string flagKey, int defaultValue, EvaluationContext? context = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(new ResolutionDetails<int>(flagKey, defaultValue, reason: "DEFAULT"));

    public override Task<ResolutionDetails<double>> ResolveDoubleValueAsync(
        string flagKey, double defaultValue, EvaluationContext? context = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(new ResolutionDetails<double>(flagKey, defaultValue, reason: "DEFAULT"));

    public override Task<ResolutionDetails<Value>> ResolveStructureValueAsync(
        string flagKey, Value defaultValue, EvaluationContext? context = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(new ResolutionDetails<Value>(flagKey, defaultValue, reason: "DEFAULT"));

    private bool? QueryFlagFromDatabase(string flagKey, EvaluationContext? context)
    {
        // Database query implementation
        return null;
    }
}
```

## OpenFeature vs Microsoft.FeatureManagement

| Aspect | OpenFeature | Microsoft.FeatureManagement |
|---|---|---|
| Governance | CNCF open standard | Microsoft-maintained |
| Provider ecosystem | Multi-vendor (LaunchDarkly, Split, Flagsmith) | Azure App Configuration |
| Flag types | Boolean, string, int, float, object | Boolean with filters |
| Targeting | Via EvaluationContext | Built-in targeting filter |
| Hooks | Before, after, error, finally | N/A |
| ASP.NET integration | Manual or community | Tag helpers, action filters |
| Best for | Multi-cloud, vendor-neutral | Microsoft-centric stacks |

## Best Practices

1. Set the provider asynchronously at startup using `await Api.Instance.SetProviderAsync(provider)` and wait for the `ProviderReady` event before serving traffic to avoid evaluating against stale defaults.
2. Always provide a meaningful default value as the second argument to every evaluation call so the application behaves correctly if the provider is unavailable or the flag is missing.
3. Use `EvaluationContext` with a `targetingKey` field set to the user identifier on every evaluation call to enable per-user targeting and consistent percentage-based rollouts.
4. Register a logging hook globally via `Api.Instance.AddHooks` to capture flag evaluation details at `Debug` level for diagnosing targeting issues without modifying business logic.
5. Use `GetBooleanDetailsAsync` instead of `GetBooleanValueAsync` when you need to log the reason, variant, and metadata alongside the flag value for audit or analytics.
6. Keep provider initialization separate from flag evaluation; set up the provider in `Program.cs` and inject `FeatureClient` into services rather than accessing `Api.Instance` directly.
7. Use `InMemoryProvider` in unit tests and integration tests to provide deterministic flag values without connecting to a remote service.
8. Define flag key constants in a shared static class and reference them throughout the codebase to prevent typos and make flag usage searchable.
9. Plan for provider migration by coding exclusively against the OpenFeature API; never cast the provider to a vendor-specific type in business logic.
10. Monitor the `ProviderError` and `ProviderStale` events to detect connectivity issues with the backing flag service and fall back gracefully to cached or default values.
