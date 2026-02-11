---
name: dotnet-worker-services
description: >
  Guidance for building .NET worker services and background tasks using BackgroundService and IHostedService.
  USE FOR: long-running background processing, message queue consumers, scheduled jobs, health monitoring services, data synchronization tasks, Windows services, Linux systemd daemons.
  DO NOT USE FOR: HTTP request handling (use ASP.NET Core), one-shot CLI tools (use console apps), UI applications, short-lived Azure Functions.
license: MIT
metadata:
  displayName: .NET Worker Services
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Worker Services in .NET Documentation on Microsoft Learn"
    url: "https://learn.microsoft.com/dotnet/core/extensions/workers"
  - title: "Background Tasks with Hosted Services in ASP.NET Core"
    url: "https://learn.microsoft.com/aspnet/core/fundamentals/host/hosted-services"
---

# .NET Worker Services

## Overview

.NET Worker Services are long-running background applications built on the Generic Host (`Microsoft.Extensions.Hosting`). They use `BackgroundService` or `IHostedService` to run tasks that operate independently of HTTP requests, such as queue processing, scheduled jobs, file watching, and health monitoring.

Worker services support the same DI, configuration, logging, and lifetime management as ASP.NET Core applications. They can run as console applications, Windows services (via `Microsoft.Extensions.Hosting.WindowsServices`), or Linux systemd daemons (via `Microsoft.Extensions.Hosting.Systemd`).

Create a new worker service:
```
dotnet new worker -n MyWorker
```

Install platform-specific hosting packages:
```
dotnet add package Microsoft.Extensions.Hosting.WindowsServices
dotnet add package Microsoft.Extensions.Hosting.Systemd
```

## Basic BackgroundService

`BackgroundService` is the standard base class for implementing long-running tasks. Override `ExecuteAsync` with your processing loop.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class QueueProcessingWorker : BackgroundService
{
    private readonly ILogger<QueueProcessingWorker> _logger;
    private readonly IMessageQueue _queue;

    public QueueProcessingWorker(
        ILogger<QueueProcessingWorker> logger,
        IMessageQueue queue)
    {
        _logger = logger;
        _queue = queue;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Queue processor starting");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var message = await _queue.DequeueAsync(stoppingToken);
                if (message is not null)
                {
                    await ProcessMessageAsync(message, stoppingToken);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                // Graceful shutdown requested
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing message");
                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }

        _logger.LogInformation("Queue processor stopped");
    }

    private async Task ProcessMessageAsync(Message message, CancellationToken token)
    {
        _logger.LogInformation("Processing message {Id}", message.Id);
        // Processing logic here
        await Task.CompletedTask;
    }
}
```

## Host Configuration and Registration

Configure the host with DI, logging, configuration, and one or more hosted services.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);

// Configure services
builder.Services.AddSingleton<IMessageQueue, InMemoryMessageQueue>();
builder.Services.AddHostedService<QueueProcessingWorker>();
builder.Services.AddHostedService<HealthCheckWorker>();

// Configure for Windows service or systemd
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "MyWorkerService";
});
builder.Services.AddSystemd();

// Configure logging
builder.Logging.AddConsole();
builder.Logging.AddEventLog(); // Windows only

using var host = builder.Build();
await host.RunAsync();
```

## Scoped Services in Workers

`BackgroundService` is registered as a singleton, so you cannot inject scoped services directly. Create a scope manually for each unit of work.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class ScopedProcessingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<ScopedProcessingWorker> _logger;

    public ScopedProcessingWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<ScopedProcessingWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var processor = scope.ServiceProvider.GetRequiredService<IOrderProcessor>();

                var pendingOrders = await dbContext.Orders
                    .Where(o => o.Status == OrderStatus.Pending)
                    .ToListAsync(stoppingToken);

                foreach (var order in pendingOrders)
                {
                    await processor.ProcessAsync(order, stoppingToken);
                }
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}
```

## Timed Background Tasks with PeriodicTimer

Use `PeriodicTimer` (introduced in .NET 6) for precise interval scheduling that does not drift over time.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class HealthCheckWorker : BackgroundService
{
    private readonly ILogger<HealthCheckWorker> _logger;
    private readonly TimeProvider _timeProvider;

    public HealthCheckWorker(
        ILogger<HealthCheckWorker> logger,
        TimeProvider timeProvider)
    {
        _logger = logger;
        _timeProvider = timeProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(30));

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            var timestamp = _timeProvider.GetUtcNow();
            _logger.LogDebug("Health check at {Timestamp}", timestamp);

            try
            {
                await CheckDependenciesAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Health check failed");
            }
        }
    }

    private async Task CheckDependenciesAsync(CancellationToken token)
    {
        // Check database, external APIs, etc.
        await Task.CompletedTask;
    }
}
```

## IHostedService vs BackgroundService

| Feature | `IHostedService` | `BackgroundService` |
|---------|-------------------|---------------------|
| Interface | `StartAsync` / `StopAsync` | `ExecuteAsync` (override) |
| Blocking behavior | Must not block `StartAsync` | `ExecuteAsync` runs in background |
| Use case | Startup/shutdown hooks, warmup | Continuous background loops |
| Cancellation | Manual | Automatic via `stoppingToken` |
| Error handling | Manual | Unhandled exceptions stop the host (configurable) |

## Graceful Shutdown with IHostApplicationLifetime

Hook into application lifecycle events for cleanup, flushing buffers, or draining in-flight work.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class GracefulWorker : IHostedService
{
    private readonly ILogger<GracefulWorker> _logger;
    private readonly IHostApplicationLifetime _lifetime;
    private Task? _executingTask;
    private CancellationTokenSource? _cts;

    public GracefulWorker(
        ILogger<GracefulWorker> logger,
        IHostApplicationLifetime lifetime)
    {
        _logger = logger;
        _lifetime = lifetime;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);

        _lifetime.ApplicationStopping.Register(() =>
        {
            _logger.LogInformation("Shutdown signal received, draining work...");
        });

        _executingTask = RunAsync(_cts.Token);
        return Task.CompletedTask;
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        if (_executingTask is null) return;

        _cts?.Cancel();

        await Task.WhenAny(_executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
        _logger.LogInformation("Worker stopped gracefully");
    }

    private async Task RunAsync(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            await Task.Delay(TimeSpan.FromSeconds(10), token);
        }
    }
}
```

## Configuring Shutdown Timeout

By default, the host waits 30 seconds for hosted services to stop. Configure this in `appsettings.json` or via host options.

```csharp
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<HostOptions>(options =>
{
    options.ShutdownTimeout = TimeSpan.FromSeconds(60);
    options.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
});
```

## Best Practices

1. **Always respect the `stoppingToken`** passed to `ExecuteAsync` -- check `IsCancellationRequested` in loops and pass the token to all async calls including `Task.Delay`.
2. **Use `IServiceScopeFactory` to create scoped services** inside worker loops because `BackgroundService` is a singleton and cannot inject scoped dependencies directly.
3. **Catch `OperationCanceledException` separately** from other exceptions in your main loop to distinguish graceful shutdown from actual errors.
4. **Use `PeriodicTimer` instead of `Task.Delay` in a loop** for timed tasks because `PeriodicTimer` accounts for processing time and does not drift.
5. **Configure `BackgroundServiceExceptionBehavior`** explicitly -- the default in .NET 8+ stops the host on unhandled exceptions, which may not be desired for resilient workers.
6. **Set the shutdown timeout** via `HostOptions.ShutdownTimeout` to give workers enough time to finish in-flight work before the process is killed.
7. **Log at startup and shutdown boundaries** in every worker to make it easy to diagnose when and why a service started or stopped.
8. **Avoid blocking `StartAsync`** when implementing `IHostedService` directly -- start your background task and return immediately so other hosted services can start.
9. **Use `AddWindowsService()` or `AddSystemd()`** for production deployments so the worker integrates properly with the OS service manager for lifecycle events.
10. **Register multiple `BackgroundService` implementations** for independent concerns (queue processing, health checks, cleanup) rather than combining them into a single monolithic worker.
