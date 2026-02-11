---
name: generic-host
description: >
  USE FOR: Building console applications, background services, and worker processes with
  standardized DI, configuration, logging, and graceful shutdown. Hosting long-running
  IHostedService and BackgroundService implementations, and composing application startup
  pipelines. DO NOT USE FOR: ASP.NET Core web applications (use WebApplication.CreateBuilder),
  desktop UI applications without background services, or simple scripts that do not need
  DI or configuration.
license: MIT
metadata:
  displayName: "Generic Host"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# .NET Generic Host

## Overview

The .NET Generic Host (`Microsoft.Extensions.Hosting`) provides a standardized framework for building non-HTTP applications such as console workers, background services, and message processors. It wires together dependency injection, configuration, logging, and application lifetime management into a single composable model. The same patterns used in ASP.NET Core (`IServiceCollection`, `IConfiguration`, `ILogger`) apply identically in hosted services.

The host manages the application lifecycle: it starts all registered `IHostedService` instances, waits for a shutdown signal (Ctrl+C, SIGTERM, or programmatic stop), and then gracefully shuts down all services in reverse registration order.

## Basic Host Setup

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Register services
builder.Services.AddSingleton<IMessageQueue, RabbitMqMessageQueue>();
builder.Services.AddHostedService<OrderProcessingWorker>();

using var host = builder.Build();
await host.RunAsync();
```

## BackgroundService for Long-Running Work

`BackgroundService` is the base class for implementing hosted services that run a loop or continuous process.

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public sealed class OrderProcessingWorker : BackgroundService
{
    private readonly ILogger<OrderProcessingWorker> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public OrderProcessingWorker(
        ILogger<OrderProcessingWorker> logger,
        IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Order processing worker started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using IServiceScope scope = _scopeFactory.CreateScope();
                var processor = scope.ServiceProvider.GetRequiredService<IOrderProcessor>();

                int processed = await processor.ProcessPendingOrdersAsync(stoppingToken);
                _logger.LogDebug("Processed {Count} orders", processed);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error processing orders");
            }

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }

        _logger.LogInformation("Order processing worker stopped");
    }
}
```

## IHostedService for Startup/Shutdown Tasks

Use `IHostedService` directly when you need explicit control over `StartAsync` and `StopAsync`.

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public sealed class CacheWarmupService : IHostedService
{
    private readonly ILogger<CacheWarmupService> _logger;
    private readonly ICacheWarmer _cacheWarmer;

    public CacheWarmupService(
        ILogger<CacheWarmupService> logger,
        ICacheWarmer cacheWarmer)
    {
        _logger = logger;
        _cacheWarmer = cacheWarmer;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Warming up caches...");
        await _cacheWarmer.WarmAsync(cancellationToken);
        _logger.LogInformation("Cache warmup complete");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Cache warmup service stopped");
        return Task.CompletedTask;
    }
}
```

## Multiple Hosted Services

Register multiple hosted services that run concurrently.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Configuration
builder.Services.Configure<WorkerOptions>(
    builder.Configuration.GetSection("Worker"));

// Application services
builder.Services.AddScoped<IOrderProcessor, OrderProcessor>();
builder.Services.AddScoped<INotificationProcessor, NotificationProcessor>();
builder.Services.AddSingleton<ICacheWarmer, ProductCacheWarmer>();

// Hosted services (start in registration order)
builder.Services.AddHostedService<CacheWarmupService>();
builder.Services.AddHostedService<OrderProcessingWorker>();
builder.Services.AddHostedService<NotificationWorker>();

using var host = builder.Build();
await host.RunAsync();
```

## Configuration and Logging

The generic host automatically loads configuration from standard sources and configures logging.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);

// Configuration is loaded automatically from:
//   appsettings.json
//   appsettings.{Environment}.json
//   Environment variables
//   Command-line arguments

// Add custom configuration sources
builder.Configuration.AddJsonFile("worker-settings.json", optional: true);

// Configure logging
builder.Logging.AddConsole();
builder.Logging.AddJsonConsole(options =>
{
    options.TimestampFormat = "yyyy-MM-dd HH:mm:ss.fff ";
});
builder.Logging.SetMinimumLevel(LogLevel.Information);

// Bind options
builder.Services.Configure<WorkerOptions>(
    builder.Configuration.GetSection("Worker"));

using var host = builder.Build();
await host.RunAsync();
```

```csharp
public sealed class WorkerOptions
{
    public int PollingIntervalSeconds { get; set; } = 10;
    public int MaxBatchSize { get; set; } = 100;
    public int MaxRetries { get; set; } = 3;
}
```

```json
{
  "Worker": {
    "PollingIntervalSeconds": 5,
    "MaxBatchSize": 50,
    "MaxRetries": 3
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

## Graceful Shutdown with IHostApplicationLifetime

React to application lifecycle events for cleanup.

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public sealed class GracefulShutdownService : IHostedService
{
    private readonly IHostApplicationLifetime _lifetime;
    private readonly ILogger<GracefulShutdownService> _logger;

    public GracefulShutdownService(
        IHostApplicationLifetime lifetime,
        ILogger<GracefulShutdownService> logger)
    {
        _lifetime = lifetime;
        _logger = logger;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _lifetime.ApplicationStarted.Register(() =>
            _logger.LogInformation("Application has started"));

        _lifetime.ApplicationStopping.Register(() =>
            _logger.LogInformation("Application is shutting down..."));

        _lifetime.ApplicationStopped.Register(() =>
            _logger.LogInformation("Application has stopped"));

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
```

## Systemd and Windows Service Integration

Run the same code as a Linux systemd service or Windows Service.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Detect and integrate with the host OS service manager
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "OrderProcessor";
});
builder.Services.AddSystemd(); // For Linux systemd

builder.Services.AddHostedService<OrderProcessingWorker>();

using var host = builder.Build();
await host.RunAsync();
```

## Timed Background Service Pattern

A reusable pattern for services that execute on a timer.

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public abstract class TimedBackgroundService : BackgroundService
{
    private readonly ILogger _logger;
    private readonly TimeSpan _interval;

    protected TimedBackgroundService(ILogger logger, TimeSpan interval)
    {
        _logger = logger;
        _interval = interval;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new(_interval);

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                await DoWorkAsync(stoppingToken);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error in {Service}", GetType().Name);
            }
        }
    }

    protected abstract Task DoWorkAsync(CancellationToken stoppingToken);
}
```

```csharp
public sealed class MetricsCollector : TimedBackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MetricsCollector(
        ILogger<MetricsCollector> logger,
        IServiceScopeFactory scopeFactory)
        : base(logger, TimeSpan.FromMinutes(1))
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task DoWorkAsync(CancellationToken stoppingToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var metrics = scope.ServiceProvider.GetRequiredService<IMetricsService>();
        await metrics.CollectAndPublishAsync(stoppingToken);
    }
}
```

## Best Practices

1. Use `Host.CreateApplicationBuilder(args)` over the older `Host.CreateDefaultBuilder(args).ConfigureServices(...)` pattern for cleaner, more concise setup in .NET 8+.
2. Inject `IServiceScopeFactory` in `BackgroundService` and create a new scope per iteration to resolve scoped services like `DbContext` safely without captive dependency issues.
3. Use `PeriodicTimer` (introduced in .NET 6) instead of `Task.Delay` in timer-based background services because it does not drift over time and respects cancellation cleanly.
4. Always catch and log exceptions inside `ExecuteAsync` loops; an unhandled exception terminates the hosted service and, depending on configuration, may crash the entire application.
5. Keep `Program.cs` focused on host configuration and registration; move service registration into `IServiceCollection` extension methods and keep business logic in separate classes.
6. Configure `HostOptions.ShutdownTimeout` to a value that matches your longest cleanup operation (default is 30 seconds) to avoid forceful termination during graceful shutdown.
7. Use `IHostApplicationLifetime.ApplicationStopping` to register cleanup callbacks for resources that are not managed by the DI container, such as external connections or file handles.
8. Call `AddWindowsService()` and `AddSystemd()` to integrate with OS service managers, allowing the same binary to run as a console app in development and a daemon in production.
9. Register startup tasks as `IHostedService` (not `BackgroundService`) when they need to complete before other services start, since hosted services start in registration order.
10. Set the `DOTNET_ENVIRONMENT` (or `ASPNETCORE_ENVIRONMENT`) environment variable to control which `appsettings.{Environment}.json` file is loaded, using `Development`, `Staging`, or `Production`.
