---
name: aspectcore
description: >
  Guidance for AspectCore AOP framework for .NET Core.
  USE FOR: cross-cutting concerns via interceptors, method-level AOP, dynamic proxies, logging/caching/authorization interception, decorating service interfaces.
  DO NOT USE FOR: compile-time weaving (use PostSharp), full IL rewriting, non-DI scenarios, .NET Framework-only projects.
license: MIT
metadata:
  displayName: AspectCore
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# AspectCore

## Overview

AspectCore is a lightweight, extensible AOP (Aspect-Oriented Programming) framework built for .NET Core and modern .NET. It uses dynamic proxy generation at runtime to intercept method calls on interfaces and virtual methods, enabling cross-cutting concerns such as logging, caching, transaction management, and authorization to be separated from business logic.

AspectCore integrates directly with the Microsoft dependency injection container by replacing the default service provider factory with one that generates dynamic proxies. Interceptors are defined as classes that inherit from `AbstractInterceptorAttribute` or `AbstractInterceptor`, and they can be applied globally, per-interface, or per-method via attributes.

Install via NuGet:
```
dotnet add package AspectCore.Extensions.DependencyInjection
dotnet add package AspectCore.Core
```

## Defining Interceptors

Interceptors are the primary building block. Each interceptor wraps a method invocation with before/after logic. The `AspectContext` provides full access to the method being called, its arguments, and the return value.

```csharp
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using AspectCore.DynamicProxy;

public class LoggingInterceptorAttribute : AbstractInterceptorAttribute
{
    public override async Task Invoke(AspectContext context, AspectDelegate next)
    {
        var methodName = context.ServiceMethod.Name;
        var stopwatch = Stopwatch.StartNew();

        Console.WriteLine($"[LOG] Entering {methodName}");
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[LOG] Exception in {methodName}: {ex.Message}");
            throw;
        }
        finally
        {
            stopwatch.Stop();
            Console.WriteLine($"[LOG] Exiting {methodName} ({stopwatch.ElapsedMilliseconds}ms)");
        }
    }
}
```

## Applying Interceptors to Services

Interceptors can be applied at the interface level or on individual methods using attributes. AspectCore intercepts calls to interface methods and virtual methods on classes registered through DI.

```csharp
using System.Threading.Tasks;
using AspectCore.DynamicProxy;

public interface IOrderService
{
    [LoggingInterceptor]
    Task<Order> GetOrderAsync(int orderId);

    [LoggingInterceptor]
    [CachingInterceptor(DurationSeconds = 300)]
    Task<IReadOnlyList<Order>> GetRecentOrdersAsync(int customerId);
}

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<Order> GetOrderAsync(int orderId)
    {
        return await _repository.FindByIdAsync(orderId);
    }

    public async Task<IReadOnlyList<Order>> GetRecentOrdersAsync(int customerId)
    {
        return await _repository.GetRecentAsync(customerId);
    }
}
```

## Caching Interceptor Example

A practical interceptor that caches method return values using `IMemoryCache`.

```csharp
using System;
using System.Threading.Tasks;
using AspectCore.DependencyInjection;
using AspectCore.DynamicProxy;
using Microsoft.Extensions.Caching.Memory;

public class CachingInterceptorAttribute : AbstractInterceptorAttribute
{
    public int DurationSeconds { get; set; } = 60;

    [FromServiceContext]
    public IMemoryCache Cache { get; set; } = default!;

    public override async Task Invoke(AspectContext context, AspectDelegate next)
    {
        var cacheKey = $"{context.ServiceMethod.DeclaringType?.Name}:{context.ServiceMethod.Name}:"
            + string.Join(":", context.Parameters);

        if (Cache.TryGetValue(cacheKey, out var cached))
        {
            context.ReturnValue = cached;
            return;
        }

        await next(context);

        var options = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(DurationSeconds)
        };
        Cache.Set(cacheKey, context.ReturnValue, options);
    }
}
```

## Registering with Dependency Injection

AspectCore replaces the default service provider factory to enable proxy generation. Use `ConfigureDynamicProxy` to register global interceptors or configure which services are proxied.

```csharp
using AspectCore.Extensions.DependencyInjection;
using AspectCore.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMemoryCache();
builder.Services.AddTransient<IOrderService, OrderService>();

builder.Services.ConfigureDynamicProxy(config =>
{
    // Global interceptor applied to all service methods
    config.Interceptors.AddTyped<LoggingInterceptorAttribute>();

    // Apply only to methods matching a predicate
    config.Interceptors.AddTyped<CachingInterceptorAttribute>(
        Predicates.ForService("*Service"));

    // Exclude specific methods from interception
    config.NonAspectPredicates.Add(
        Predicates.ForService("*HealthCheck*"));
});

// Replace the default service provider with AspectCore's proxy-aware provider
builder.Host.UseServiceProviderFactory(new DynamicProxyServiceProviderFactory());

using var host = builder.Build();
await host.RunAsync();
```

## Interceptor vs Decorator vs Middleware

| Approach | Scope | Granularity | DI Integration | Use Case |
|----------|-------|-------------|----------------|----------|
| AspectCore Interceptor | Method-level | Per-method or per-interface | Built-in proxy factory | Cross-cutting on service methods |
| Manual Decorator | Class-level | Per-class | Manual registration | Single wrapper per service |
| ASP.NET Middleware | Request pipeline | Per-request | Pipeline builder | HTTP-specific concerns |
| MediatR Pipeline | Handler-level | Per-request/command | MediatR DI | CQRS pipeline behaviors |

## Non-Attribute Global Interceptors

For interceptors that should not use attributes, register them as typed interceptors in configuration. This is useful for applying concerns across all services without modifying interfaces.

```csharp
using System;
using System.Threading.Tasks;
using AspectCore.DynamicProxy;
using Microsoft.Extensions.Logging;
using AspectCore.DependencyInjection;

public class GlobalExceptionInterceptor : AbstractInterceptor
{
    [FromServiceContext]
    public ILogger<GlobalExceptionInterceptor> Logger { get; set; } = default!;

    public override async Task Invoke(AspectContext context, AspectDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Unhandled exception in {Service}.{Method}",
                context.ServiceMethod.DeclaringType?.Name,
                context.ServiceMethod.Name);
            throw;
        }
    }
}
```

## Best Practices

1. **Keep interceptors focused on a single concern** -- each interceptor should handle exactly one cross-cutting responsibility (logging, caching, retry, etc.) rather than combining multiple behaviors.
2. **Apply interceptors via attributes for explicit control** and use global registration only for truly universal concerns like exception logging or telemetry.
3. **Inject services into interceptors using `[FromServiceContext]`** instead of constructor injection, because interceptor instances are managed by the proxy infrastructure.
4. **Order interceptors deliberately** by setting the `Order` property on `AbstractInterceptorAttribute` when multiple interceptors are applied to the same method.
5. **Avoid intercepting hot-path methods** where nanosecond-level performance matters, as dynamic proxy invocation adds overhead per call.
6. **Always call `await next(context)`** in your interceptor unless you intentionally want to short-circuit the method call (e.g., returning a cached result).
7. **Use `Predicates` in `ConfigureDynamicProxy`** to exclude infrastructure services (health checks, middleware components) that should not be proxied.
8. **Test interceptors in isolation** by creating a mock `AspectContext` and `AspectDelegate` to verify before/after behavior without standing up the full DI container.
9. **Prefer interface-based services** over class-based services because AspectCore can proxy all interface methods but only virtual methods on classes.
10. **Register the `DynamicProxyServiceProviderFactory`** on the host builder -- without this step, no proxies are generated and interceptors silently do nothing.
