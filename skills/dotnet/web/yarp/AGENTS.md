# YARP

## Overview

YARP (Yet Another Reverse Proxy) is a highly customizable reverse proxy library from Microsoft, built on ASP.NET Core. It provides configurable routing, load balancing (round-robin, random, power-of-two-choices, least-requests), health checks (active and passive), session affinity, header/path/query transforms, and request forwarding. YARP can be configured through JSON files, code, or dynamic configuration providers (service discovery, databases, APIs). It integrates into the ASP.NET Core middleware pipeline, enabling custom middleware to run before, during, or after proxying. YARP is suitable for building API gateways, BFF (Backend for Frontend) layers, multi-tenant routers, and load balancers within .NET applications.

## Basic Setup with Configuration

Configure YARP from `appsettings.json` with routes and clusters.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();

app.Run();
```

```json
// appsettings.json
{
  "ReverseProxy": {
    "Routes": {
      "products-route": {
        "ClusterId": "products-cluster",
        "Match": {
          "Path": "/api/products/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/api/products" },
          { "RequestHeader": "X-Forwarded-Prefix", "Set": "/api/products" }
        ]
      },
      "orders-route": {
        "ClusterId": "orders-cluster",
        "AuthorizationPolicy": "authenticated",
        "Match": {
          "Path": "/api/orders/{**catch-all}",
          "Methods": [ "GET", "POST", "PUT" ]
        }
      },
      "static-route": {
        "ClusterId": "static-cluster",
        "Match": {
          "Path": "/static/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/static" }
        ]
      }
    },
    "Clusters": {
      "products-cluster": {
        "LoadBalancingPolicy": "RoundRobin",
        "HealthCheck": {
          "Active": {
            "Enabled": true,
            "Interval": "00:00:30",
            "Timeout": "00:00:10",
            "Path": "/health"
          }
        },
        "Destinations": {
          "products-v1": {
            "Address": "https://products-service-1:5001/"
          },
          "products-v2": {
            "Address": "https://products-service-2:5001/"
          }
        }
      },
      "orders-cluster": {
        "LoadBalancingPolicy": "LeastRequests",
        "Destinations": {
          "orders-primary": {
            "Address": "https://orders-service:5002/"
          }
        }
      },
      "static-cluster": {
        "Destinations": {
          "cdn": {
            "Address": "https://cdn.example.com/"
          }
        }
      }
    }
  }
}
```

## Programmatic Configuration

Configure routes and clusters in code for dynamic scenarios.

```csharp
using Yarp.ReverseProxy.Configuration;

var builder = WebApplication.CreateBuilder(args);

var routes = new[]
{
    new RouteConfig
    {
        RouteId = "api-route",
        ClusterId = "api-cluster",
        Match = new RouteMatch
        {
            Path = "/api/{**catch-all}"
        },
        Transforms = new[]
        {
            new Dictionary<string, string>
            {
                ["PathRemovePrefix"] = "/api"
            },
            new Dictionary<string, string>
            {
                ["RequestHeadersCopy"] = "true"
            },
            new Dictionary<string, string>
            {
                ["RequestHeader"] = "X-Gateway",
                ["Set"] = "yarp-v1"
            }
        }
    }
};

var clusters = new[]
{
    new ClusterConfig
    {
        ClusterId = "api-cluster",
        LoadBalancingPolicy = "PowerOfTwoChoices",
        HealthCheck = new HealthCheckConfig
        {
            Active = new ActiveHealthCheckConfig
            {
                Enabled = true,
                Interval = TimeSpan.FromSeconds(15),
                Timeout = TimeSpan.FromSeconds(5),
                Path = "/health"
            },
            Passive = new PassiveHealthCheckConfig
            {
                Enabled = true,
                Policy = "TransportFailureRate",
                ReactivationPeriod = TimeSpan.FromMinutes(1)
            }
        },
        SessionAffinity = new SessionAffinityConfig
        {
            Enabled = true,
            Policy = "Cookie",
            AffinityKeyName = ".Yarp.Affinity"
        },
        Destinations = new Dictionary<string, DestinationConfig>
        {
            ["backend-1"] = new() { Address = "https://backend-1:5001/" },
            ["backend-2"] = new() { Address = "https://backend-2:5001/" },
            ["backend-3"] = new() { Address = "https://backend-3:5001/" }
        }
    }
};

builder.Services.AddReverseProxy()
    .LoadFromMemory(routes, clusters);

var app = builder.Build();

app.MapReverseProxy();

app.Run();
```

## Custom Middleware in the Proxy Pipeline

Add middleware that runs within the YARP proxy pipeline for request/response manipulation.

```csharp
using Yarp.ReverseProxy.Model;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy(proxyPipeline =>
{
    // Middleware runs in the YARP proxy pipeline
    proxyPipeline.Use(async (context, next) =>
    {
        var proxyFeature = context.GetReverseProxyFeature();
        var clusterId = proxyFeature.Route.Config.ClusterId;

        // Add timing
        var stopwatch = Stopwatch.StartNew();

        // Add correlation ID
        var correlationId = context.Request.Headers["X-Correlation-Id"].FirstOrDefault()
            ?? Guid.NewGuid().ToString();
        context.Request.Headers["X-Correlation-Id"] = correlationId;

        await next();

        stopwatch.Stop();

        // Add response headers
        context.Response.Headers["X-Proxy-Latency"] = $"{stopwatch.ElapsedMilliseconds}ms";
        context.Response.Headers["X-Served-By"] = clusterId;
        context.Response.Headers["X-Correlation-Id"] = correlationId;

        // Log slow responses
        if (stopwatch.ElapsedMilliseconds > 2000)
        {
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogWarning(
                "Slow proxy response: {Cluster} took {Duration}ms for {Path}",
                clusterId,
                stopwatch.ElapsedMilliseconds,
                context.Request.Path);
        }
    });

    proxyPipeline.UseSessionAffinity();
    proxyPipeline.UseLoadBalancing();
    proxyPipeline.UsePassiveHealthChecks();
});

app.Run();
```

## Dynamic Configuration Provider

Implement a custom configuration provider that loads routes from a database or API.

```csharp
using Yarp.ReverseProxy.Configuration;
using Microsoft.Extensions.Primitives;
using System.Collections.Concurrent;

namespace MyApp.Proxy;

public class DatabaseProxyConfigProvider : IProxyConfigProvider, IDisposable
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<DatabaseProxyConfigProvider> _logger;
    private readonly CancellationTokenSource _cts = new();
    private InMemoryConfig _config;

    public DatabaseProxyConfigProvider(
        IServiceScopeFactory scopeFactory,
        ILogger<DatabaseProxyConfigProvider> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _config = new InMemoryConfig(
            Array.Empty<RouteConfig>(),
            Array.Empty<ClusterConfig>());

        // Start background refresh
        _ = RefreshConfigPeriodically(_cts.Token);
    }

    public IProxyConfig GetConfig() => _config;

    private async Task RefreshConfigPeriodically(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                await RefreshAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to refresh proxy configuration");
            }

            await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
        }
    }

    private async Task RefreshAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ProxyDbContext>();

        var dbRoutes = await dbContext.ProxyRoutes.ToListAsync();
        var dbClusters = await dbContext.ProxyClusters
            .Include(c => c.Destinations)
            .ToListAsync();

        var routes = dbRoutes.Select(r => new RouteConfig
        {
            RouteId = r.RouteId,
            ClusterId = r.ClusterId,
            Match = new RouteMatch { Path = r.MatchPath }
        }).ToList();

        var clusters = dbClusters.Select(c => new ClusterConfig
        {
            ClusterId = c.ClusterId,
            LoadBalancingPolicy = c.LoadBalancingPolicy,
            Destinations = c.Destinations.ToDictionary(
                d => d.DestinationId,
                d => new DestinationConfig { Address = d.Address })
        }).ToList();

        var oldConfig = _config;
        _config = new InMemoryConfig(routes, clusters);
        oldConfig.SignalChange();

        _logger.LogInformation(
            "Proxy config refreshed: {Routes} routes, {Clusters} clusters",
            routes.Count, clusters.Count);
    }

    public void Dispose() => _cts.Cancel();
}

public class InMemoryConfig : IProxyConfig
{
    private readonly CancellationTokenSource _cts = new();

    public InMemoryConfig(
        IReadOnlyList<RouteConfig> routes,
        IReadOnlyList<ClusterConfig> clusters)
    {
        Routes = routes;
        Clusters = clusters;
        ChangeToken = new CancellationChangeToken(_cts.Token);
    }

    public IReadOnlyList<RouteConfig> Routes { get; }
    public IReadOnlyList<ClusterConfig> Clusters { get; }
    public IChangeToken ChangeToken { get; }

    public void SignalChange() => _cts.Cancel();
}

// Registration
builder.Services.AddSingleton<IProxyConfigProvider, DatabaseProxyConfigProvider>();
builder.Services.AddReverseProxy();
```

## YARP vs Other Reverse Proxy Solutions

| Feature | YARP | Ocelot | NGINX | Envoy |
|---|---|---|---|---|
| Language | C# / .NET | C# / .NET | C / Lua | C++ |
| Configuration | JSON / code / custom provider | JSON file | nginx.conf | YAML / xDS |
| Load balancing | Round-robin, random, power-of-two, least-requests | Round-robin, least-conn | Round-robin, least-conn, IP hash | Round-robin, least-req, ring hash |
| Health checks | Active + passive | Not built-in | Active (upstream) | Active + passive + outlier |
| Session affinity | Cookie, header, custom | Not built-in | IP hash, sticky cookie | Cookie, header, ring hash |
| Transforms | Path, header, query | Not built-in | Header manipulation | Header, path, Lua filters |
| Dynamic config | Custom IProxyConfigProvider | JSON reload | Reload signal | xDS API |
| Custom middleware | ASP.NET Core pipeline | Delegating handlers | Lua scripting | WASM / C++ filters |
| Request aggregation | Not built-in | Built-in | Not built-in | Not built-in |
| Performance | Very high (.NET optimized) | Moderate | Very high (C/epoll) | Very high (C++/epoll) |

## Best Practices

1. **Enable both active and passive health checks** on clusters with multiple destinations, setting `Active.Enabled = true` with a health endpoint path and `Passive.Enabled = true` with `TransportFailureRate` policy, so that unhealthy destinations are detected both proactively (periodic probes) and reactively (failed request responses).

2. **Use `PowerOfTwoChoices` load balancing** for most production scenarios instead of `RoundRobin`, because it selects the least-loaded destination from two randomly chosen candidates, providing better distribution than round-robin when destination response times vary without the overhead of tracking all destination loads.

3. **Configure session affinity with `Cookie` policy** when backend services maintain in-memory session state (shopping carts, wizard flows), setting `AffinityKeyName` to a unique cookie name, so that subsequent requests from the same client are routed to the same destination for the duration of the session.

4. **Use transforms to strip route prefixes** with `PathRemovePrefix` and add forwarded headers with `RequestHeader` transforms, rather than modifying backend services to handle gateway prefixes, because transforms keep backend services unaware of the gateway's URL structure.

5. **Implement `IProxyConfigProvider` for dynamic configuration** from databases, service registries, or APIs when routes and clusters change at runtime, calling `SignalChange()` on the `CancellationChangeToken` to notify YARP of configuration updates without restarting the application.

6. **Add custom middleware to the proxy pipeline using `MapReverseProxy(pipeline => ...)`** for cross-cutting concerns (logging, metrics, rate limiting, authentication validation), placing it before `UseLoadBalancing()` so it runs before destination selection and can short-circuit requests.

7. **Set `Active.Interval` and `Active.Timeout` on health checks** to appropriate values for your environment (e.g., 15-second interval, 5-second timeout for local services; 30-second interval, 10-second timeout for remote services), because aggressive intervals increase health check traffic while long intervals delay detection of failed destinations.

8. **Use route ordering with `Order` property** when multiple routes could match the same request path, because YARP evaluates routes in ascending order and stops at the first match; without explicit ordering, the matching route depends on configuration source order which may vary between deployments.

9. **Configure `MaxRequestBodySize` and timeouts on routes** that proxy file uploads or long-running operations, because the default Kestrel limits (30 MB body, 30-second timeout) may be too restrictive for large file uploads or too generous for API calls, and mismatched timeouts cause confusing gateway errors.

10. **Deploy YARP with Kestrel in process** rather than behind IIS in-process hosting for maximum performance, because YARP's proxy pipeline directly accesses Kestrel's HTTP/2 and connection pooling capabilities; when deploying behind IIS, configure `ForwardedHeaders` middleware to preserve the original client IP and scheme.
