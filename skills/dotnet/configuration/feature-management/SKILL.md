---
name: feature-management
description: >
  USE FOR: Configuration-driven feature flags, percentage-based rollouts, time-windowed features,
  user-targeting filters, feature gates in ASP.NET Core controllers and Razor pages, and Azure
  App Configuration integration. DO NOT USE FOR: Runtime compatibility switches (use AppContext),
  A/B testing with analytics integration (use a dedicated experimentation platform), or
  non-.NET clients needing a vendor-neutral SDK (use OpenFeature).
license: MIT
metadata:
  displayName: "Feature Management"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Microsoft.FeatureManagement

## Overview

`Microsoft.FeatureManagement` is a library built on top of `Microsoft.Extensions.Configuration` that provides first-class feature flag support for .NET applications. Feature flags are defined in configuration (typically `appsettings.json` or Azure App Configuration) and evaluated at runtime through the `IFeatureManager` interface. The library includes built-in filters for percentage-based rollouts, time windows, and targeting (user/group), and supports custom filters for any evaluation logic.

The ASP.NET Core integration package (`Microsoft.FeatureManagement.AspNetCore`) adds MVC action filters, tag helpers, middleware, and endpoint filters for gating features declaratively.

## Registration and Basic Usage

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.FeatureManagement;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddFeatureManagement();

var app = builder.Build();
```

```json
{
  "FeatureManagement": {
    "NewDashboard": true,
    "ExperimentalSearch": false,
    "BetaReporting": {
      "EnabledFor": [
        {
          "Name": "Percentage",
          "Parameters": {
            "Value": 25
          }
        }
      ]
    }
  }
}
```

```csharp
using Microsoft.FeatureManagement;

public sealed class DashboardService
{
    private readonly IFeatureManager _featureManager;

    public DashboardService(IFeatureManager featureManager)
    {
        _featureManager = featureManager;
    }

    public async Task<DashboardModel> GetDashboardAsync(CancellationToken ct)
    {
        if (await _featureManager.IsEnabledAsync("NewDashboard"))
        {
            return await BuildNewDashboardAsync(ct);
        }
        return await BuildClassicDashboardAsync(ct);
    }

    private Task<DashboardModel> BuildNewDashboardAsync(CancellationToken ct) => /* ... */ Task.FromResult(new DashboardModel());
    private Task<DashboardModel> BuildClassicDashboardAsync(CancellationToken ct) => /* ... */ Task.FromResult(new DashboardModel());
}
```

## Built-in Filters

### Percentage Filter

Enables a feature for a percentage of evaluations. Useful for gradual rollouts.

```json
{
  "FeatureManagement": {
    "NewCheckout": {
      "EnabledFor": [
        {
          "Name": "Percentage",
          "Parameters": {
            "Value": 50
          }
        }
      ]
    }
  }
}
```

### Time Window Filter

Enables a feature during a specific time range.

```json
{
  "FeatureManagement": {
    "HolidaySale": {
      "EnabledFor": [
        {
          "Name": "TimeWindow",
          "Parameters": {
            "Start": "2025-12-20T00:00:00Z",
            "End": "2025-12-31T23:59:59Z"
          }
        }
      ]
    }
  }
}
```

### Targeting Filter

Enables a feature for specific users, groups, or a default rollout percentage.

```csharp
using Microsoft.FeatureManagement;
using Microsoft.FeatureManagement.FeatureFilters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFeatureManagement()
    .AddFeatureFilter<TargetingFilter>();

builder.Services.AddSingleton<ITargetingContextAccessor, HttpContextTargetingContextAccessor>();
```

```csharp
using Microsoft.FeatureManagement.FeatureFilters;

public sealed class HttpContextTargetingContextAccessor : ITargetingContextAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextTargetingContextAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public ValueTask<TargetingContext> GetContextAsync()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        var user = httpContext?.User;

        return new ValueTask<TargetingContext>(new TargetingContext
        {
            UserId = user?.Identity?.Name ?? "anonymous",
            Groups = user?.Claims
                .Where(c => c.Type == "group")
                .Select(c => c.Value)
                .ToList() ?? new List<string>()
        });
    }
}
```

```json
{
  "FeatureManagement": {
    "PremiumFeature": {
      "EnabledFor": [
        {
          "Name": "Targeting",
          "Parameters": {
            "Audience": {
              "Users": ["alice@example.com", "bob@example.com"],
              "Groups": [
                {
                  "Name": "BetaTesters",
                  "RolloutPercentage": 100
                },
                {
                  "Name": "InternalUsers",
                  "RolloutPercentage": 50
                }
              ],
              "DefaultRolloutPercentage": 10
            }
          }
        }
      ]
    }
  }
}
```

## Custom Feature Filter

Implement `IFeatureFilter` to create evaluation logic based on any criteria.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.FeatureManagement;

[FilterAlias("Country")]
public sealed class CountryFilter : IFeatureFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CountryFilter(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Task<bool> EvaluateAsync(FeatureFilterEvaluationContext context)
    {
        var settings = context.Parameters.Get<CountryFilterSettings>();
        if (settings?.AllowedCountries is null)
        {
            return Task.FromResult(false);
        }

        string? userCountry = _httpContextAccessor.HttpContext?
            .Request.Headers["X-Country-Code"].FirstOrDefault();

        bool isAllowed = userCountry is not null &&
            settings.AllowedCountries.Contains(userCountry, StringComparer.OrdinalIgnoreCase);

        return Task.FromResult(isAllowed);
    }
}

public sealed class CountryFilterSettings
{
    public List<string> AllowedCountries { get; set; } = new();
}
```

```json
{
  "FeatureManagement": {
    "LocalizedPayments": {
      "EnabledFor": [
        {
          "Name": "Country",
          "Parameters": {
            "AllowedCountries": ["US", "CA", "GB"]
          }
        }
      ]
    }
  }
}
```

## ASP.NET Core Integration

### Feature Gate on Controllers and Actions

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement.Mvc;

[FeatureGate("NewDashboard")]
public class DashboardController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

public class ReportsController : Controller
{
    [FeatureGate("ExperimentalSearch")]
    public IActionResult Search(string query)
    {
        return View();
    }
}
```

### Feature Gate on Minimal API Endpoints

```csharp
using Microsoft.FeatureManagement;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddFeatureManagement();

var app = builder.Build();

app.MapGet("/api/v2/orders", async (IOrderService orders) =>
{
    return await orders.GetAllAsync();
})
.WithMetadata(new FeatureGateAttribute("V2Api"));

app.Run();
```

### Tag Helpers in Razor

```html
@addTagHelper *, Microsoft.FeatureManagement.AspNetCore

<feature name="NewDashboard">
    <div class="new-dashboard">
        <h2>Welcome to the new dashboard!</h2>
    </div>
</feature>

<feature name="NewDashboard" negate="true">
    <div class="classic-dashboard">
        <h2>Classic Dashboard</h2>
    </div>
</feature>
```

## Feature Flag Naming Conventions

| Pattern | Example | Use Case |
|---|---|---|
| Feature name | `NewDashboard` | Simple boolean toggle |
| Domain.Feature | `Checkout.ExpressPayment` | Scoped to a domain area |
| Experiment ID | `Exp_2025Q1_SearchV2` | Time-bound experiments |
| Kill switch | `KillSwitch.ExternalApiCalls` | Emergency disable |

## Best Practices

1. Define feature flag names as constants in a static class (e.g., `FeatureFlags.NewDashboard`) and reference them everywhere instead of using magic strings.
2. Always test both the enabled and disabled code paths in unit tests by mocking `IFeatureManager.IsEnabledAsync` to return `true` and `false` separately.
3. Use the `TargetingFilter` for gradual rollouts rather than the `Percentage` filter when you need consistent per-user evaluation (same user always gets the same result).
4. Establish a process to remove feature flags after a feature is fully rolled out; stale flags accumulate tech debt and make the codebase harder to reason about.
5. Prefer the `[FeatureGate]` attribute or Razor tag helpers over manual `if/else` checks in controllers and views to keep feature gating declarative and centralized.
6. Use Azure App Configuration as the backing store in production for dynamic flag updates without redeployment, paired with `reloadOnChange` polling or push-based refresh.
7. Combine multiple filters with `RequirementType: All` when a feature should only be enabled if every condition is met (e.g., targeting AND time window).
8. Log feature flag evaluation results at the `Debug` level to help diagnose why a specific user did or did not see a feature during incident investigation.
9. Implement `ITargetingContextAccessor` to provide user identity and group membership from `HttpContext.User` claims so that targeting filters work correctly in web applications.
10. Avoid nesting feature flag checks more than one level deep; refactor deeply nested flag logic into separate strategy classes selected by a single flag evaluation.
