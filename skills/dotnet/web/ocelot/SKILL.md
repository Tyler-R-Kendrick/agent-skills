---
name: ocelot
description: |
  USE FOR: Building API gateways in .NET using Ocelot for microservices architectures. Use when you need request routing, load balancing, rate limiting, request aggregation, authentication forwarding, and service discovery across multiple downstream services behind a unified entry point.
  DO NOT USE FOR: Simple single-service reverse proxying (use YARP), high-throughput proxying requiring custom transforms and session affinity (use YARP), or service mesh features like mTLS and distributed tracing injection (use Istio, Linkerd, or Dapr).
license: MIT
metadata:
  displayName: Ocelot
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Ocelot

## Overview

Ocelot is an open-source API gateway for .NET that sits between client applications and downstream microservices, providing unified routing, load balancing, authentication, rate limiting, caching, request aggregation, and service discovery. Ocelot is configured primarily through JSON, mapping upstream (client-facing) routes to downstream (service) endpoints. It integrates with ASP.NET Core's middleware pipeline, supports Consul and Eureka for service discovery, and can forward authentication tokens from the gateway to downstream services. Ocelot is well suited for microservices architectures that need a lightweight gateway without deploying a separate infrastructure component like Kong or AWS API Gateway.

## Basic Gateway Setup

Configure Ocelot in an ASP.NET Core application with route definitions.

```csharp
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

await app.UseOcelot();

app.Run();
```

```json
// ocelot.json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        { "Host": "product-service", "Port": 443 }
      ],
      "UpstreamPathTemplate": "/products/{everything}",
      "UpstreamHttpMethod": [ "Get", "Post", "Put", "Delete" ],
      "AuthenticationOptions": {
        "AuthenticationProviderKey": "Bearer"
      },
      "RateLimitOptions": {
        "EnableRateLimiting": true,
        "Period": "1m",
        "PeriodTimespan": 5,
        "Limit": 100
      }
    },
    {
      "DownstreamPathTemplate": "/api/orders/{everything}",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        { "Host": "order-service-1", "Port": 443 },
        { "Host": "order-service-2", "Port": 443 }
      ],
      "UpstreamPathTemplate": "/orders/{everything}",
      "UpstreamHttpMethod": [ "Get", "Post" ],
      "LoadBalancerOptions": {
        "Type": "RoundRobin"
      }
    }
  ],
  "GlobalConfiguration": {
    "BaseUrl": "https://api.mysite.com",
    "RateLimitOptions": {
      "DisableRateLimitHeaders": false,
      "QuotaExceededMessage": "Rate limit exceeded. Try again later.",
      "HttpStatusCode": 429
    }
  }
}
```

## Authentication and Authorization

Forward JWT tokens to downstream services and enforce policies at the gateway.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://identity.mysite.com";
        options.Audience = "api-gateway";
        options.RequireHttpsMetadata = true;
    });

builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

app.UseAuthentication();
await app.UseOcelot();

app.Run();
```

```json
// Route with authorization in ocelot.json
{
  "DownstreamPathTemplate": "/api/admin/{everything}",
  "DownstreamScheme": "https",
  "DownstreamHostAndPorts": [
    { "Host": "admin-service", "Port": 443 }
  ],
  "UpstreamPathTemplate": "/admin/{everything}",
  "UpstreamHttpMethod": [ "Get", "Post", "Put", "Delete" ],
  "AuthenticationOptions": {
    "AuthenticationProviderKey": "Bearer"
  },
  "RouteClaimsRequirement": {
    "role": "admin"
  }
}
```

## Request Aggregation

Combine responses from multiple downstream services into a single response.

```json
// ocelot.json with aggregation
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/users/{userId}",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        { "Host": "user-service", "Port": 443 }
      ],
      "UpstreamPathTemplate": "/users/{userId}",
      "UpstreamHttpMethod": [ "Get" ],
      "Key": "user"
    },
    {
      "DownstreamPathTemplate": "/api/orders?userId={userId}",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        { "Host": "order-service", "Port": 443 }
      ],
      "UpstreamPathTemplate": "/orders?userId={userId}",
      "UpstreamHttpMethod": [ "Get" ],
      "Key": "orders"
    }
  ],
  "Aggregates": [
    {
      "RouteKeys": [ "user", "orders" ],
      "UpstreamPathTemplate": "/user-dashboard/{userId}"
    }
  ]
}
```

```csharp
using Ocelot.Middleware;
using Ocelot.Multiplexer;

// Custom aggregator for transforming combined responses
public class UserDashboardAggregator : IDefinedAggregator
{
    public async Task<DownstreamResponse> Aggregate(List<HttpContext> responses)
    {
        var userResponse = await responses[0].Items
            .DownstreamResponse().Content.ReadAsStringAsync();
        var ordersResponse = await responses[1].Items
            .DownstreamResponse().Content.ReadAsStringAsync();

        var combined = $"{{\"user\": {userResponse}, \"orders\": {ordersResponse}}}";

        var headers = new List<Header>
        {
            new("Content-Type", new[] { "application/json" })
        };

        return new DownstreamResponse(
            new StringContent(combined),
            System.Net.HttpStatusCode.OK,
            headers,
            "OK");
    }
}
```

## Service Discovery with Consul

Use Consul for dynamic service discovery instead of hardcoded hosts.

```csharp
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Consul;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration)
    .AddConsul();

var app = builder.Build();

await app.UseOcelot();

app.Run();
```

```json
// ocelot.json with Consul
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "https",
      "UpstreamPathTemplate": "/products/{everything}",
      "UpstreamHttpMethod": [ "Get" ],
      "ServiceName": "product-service",
      "LoadBalancerOptions": {
        "Type": "LeastConnection"
      }
    }
  ],
  "GlobalConfiguration": {
    "ServiceDiscoveryProvider": {
      "Scheme": "http",
      "Host": "consul-server",
      "Port": 8500,
      "Type": "Consul"
    }
  }
}
```

## Ocelot vs Other API Gateways

| Feature | Ocelot | YARP | Kong | AWS API Gateway |
|---|---|---|---|---|
| Language | C# / .NET | C# / .NET | Lua / Go | Managed service |
| Configuration | JSON file | JSON / code | Admin API / YAML | Console / CloudFormation |
| Load balancing | Round-robin, least-conn | Round-robin, random, power-of-two | Ring balancer | ALB/NLB integration |
| Rate limiting | Built-in per-route | Custom middleware | Plugin-based | Built-in per-stage |
| Service discovery | Consul, Eureka | Custom providers | DNS, Consul | VPC Link, Cloud Map |
| Auth forwarding | JWT pass-through | Header transforms | Plugin-based | Lambda authorizer |
| Request aggregation | Built-in | Custom middleware | Not built-in | Not built-in |
| Caching | Built-in | Custom middleware | Plugin-based | Built-in |
| Complexity | Low | Low-medium | Medium-high | Medium |

## Best Practices

1. **Split route configuration into environment-specific files** using `AddJsonFile($"ocelot.{env.EnvironmentName}.json")` so that downstream host addresses differ between development (localhost), staging (internal DNS), and production (service mesh addresses) without modifying shared route definitions.

2. **Assign a unique `Key` property to routes used in aggregation** and define aggregates referencing those keys, rather than building a custom controller that calls multiple services, because Ocelot executes aggregated requests in parallel and combines results with a single upstream response.

3. **Enable rate limiting per route with `RateLimitOptions`** specifying `Period`, `Limit`, and `PeriodTimespan` (the retry-after seconds), and set `HttpStatusCode` to 429 in `GlobalConfiguration.RateLimitOptions`, so that abusive clients receive standard rate-limit headers without downstream services being overwhelmed.

4. **Use `LoadBalancerOptions` with `LeastConnection` for stateless services** that have variable response times, and `RoundRobin` for services with consistent latency, listing multiple `DownstreamHostAndPorts` entries per route to distribute traffic without an external load balancer.

5. **Configure `AuthenticationOptions.AuthenticationProviderKey` on routes that require authentication** and register the corresponding JWT bearer scheme in `Program.cs`, so that Ocelot validates tokens at the gateway before forwarding requests, reducing load on downstream services that would otherwise validate tokens independently.

6. **Use `RouteClaimsRequirement` on routes that need role-based access control** (e.g., `"role": "admin"`) to reject unauthorized requests at the gateway rather than in downstream services, centralizing authorization policy and preventing unauthenticated traffic from reaching internal services.

7. **Enable Consul or Eureka service discovery for dynamic environments** (Kubernetes, Docker Swarm) where downstream service addresses change frequently, setting `ServiceName` on each route instead of hardcoding `DownstreamHostAndPorts`, so the gateway resolves healthy instances from the service registry at request time.

8. **Set `ReRoutesCaseSensitive` to `false` in `GlobalConfiguration`** unless your upstream URLs are intentionally case-sensitive, because clients may send `/Products/123` or `/products/123` and mismatched casing results in 404 responses that are difficult to diagnose.

9. **Use the caching feature with `FileCacheOptions` on read-heavy GET routes** specifying `TtlSeconds` to cache downstream responses at the gateway, reducing latency and downstream load for data that changes infrequently (product catalogs, configuration lookups).

10. **Deploy Ocelot behind a TLS-terminating reverse proxy** (NGINX, Azure Application Gateway) and configure `GlobalConfiguration.BaseUrl` to match the public-facing URL, so that rate-limit headers, redirect URLs, and HATEOAS links reference the correct external address rather than the gateway's internal address.
