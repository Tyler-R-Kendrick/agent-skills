---
name: topshelf
description: >
  Guidance for Topshelf Windows service hosting framework for .NET.
  USE FOR: creating Windows services with fluent API, service install/uninstall from command line, service recovery configuration, running services as console apps during development, .NET Framework Windows services.
  DO NOT USE FOR: modern .NET 6+ worker services (use BackgroundService with AddWindowsService), Linux daemons (use systemd hosting), cross-platform services, ASP.NET Core web hosting.
license: MIT
metadata:
  displayName: Topshelf
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Topshelf

## Overview

Topshelf is a framework for hosting .NET applications as Windows services. It replaces the boilerplate `ServiceBase` class and `InstallUtil.exe` workflow with a fluent API for service configuration, installation, and lifecycle management. Services built with Topshelf run as console applications during development and as Windows services in production, without code changes.

**Important:** Topshelf was designed for .NET Framework and early .NET Core. For modern .NET 6+ applications, prefer `BackgroundService` with `Microsoft.Extensions.Hosting.WindowsServices`. Topshelf remains relevant for maintaining legacy services and for projects that need its specific service management features.

Install via NuGet:
```
dotnet add package Topshelf
```

## Basic Service Definition

Define a service class with `Start` and `Stop` methods, then configure it with the Topshelf host factory.

```csharp
using System;
using System.Threading;
using Topshelf;

public class DataSyncService
{
    private Timer? _timer;
    private readonly TimeSpan _interval = TimeSpan.FromMinutes(5);

    public bool Start(HostControl hostControl)
    {
        Console.WriteLine("DataSync service starting...");
        _timer = new Timer(DoSync, null, TimeSpan.Zero, _interval);
        return true;
    }

    public bool Stop(HostControl hostControl)
    {
        Console.WriteLine("DataSync service stopping...");
        _timer?.Change(Timeout.Infinite, 0);
        _timer?.Dispose();
        return true;
    }

    private void DoSync(object? state)
    {
        Console.WriteLine($"[{DateTime.UtcNow:HH:mm:ss}] Synchronizing data...");
        // Sync logic here
    }
}

// Program.cs
public class Program
{
    public static int Main(string[] args)
    {
        var exitCode = HostFactory.Run(x =>
        {
            x.Service<DataSyncService>(s =>
            {
                s.ConstructUsing(name => new DataSyncService());
                s.WhenStarted((service, hostControl) => service.Start(hostControl));
                s.WhenStopped((service, hostControl) => service.Stop(hostControl));
            });

            x.RunAsLocalSystem();
            x.SetServiceName("DataSyncService");
            x.SetDisplayName("Data Synchronization Service");
            x.SetDescription("Periodically synchronizes data between systems.");

            x.StartAutomatically();
        });

        return (int)exitCode;
    }
}
```

## Service with Pause and Continue

Implement pause/resume support for services that can be temporarily suspended.

```csharp
using System;
using System.Threading;
using Topshelf;

public class QueueProcessorService : ServiceControl, ServicePause
{
    private Timer? _timer;
    private bool _isPaused;

    public bool Start(HostControl hostControl)
    {
        _timer = new Timer(ProcessQueue, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
        return true;
    }

    public bool Stop(HostControl hostControl)
    {
        _timer?.Dispose();
        return true;
    }

    public bool Pause(HostControl hostControl)
    {
        _isPaused = true;
        Console.WriteLine("Service paused");
        return true;
    }

    public bool Continue(HostControl hostControl)
    {
        _isPaused = false;
        Console.WriteLine("Service resumed");
        return true;
    }

    private void ProcessQueue(object? state)
    {
        if (_isPaused) return;
        Console.WriteLine($"[{DateTime.UtcNow:HH:mm:ss}] Processing queue...");
    }
}

// Configuration with pause support
HostFactory.Run(x =>
{
    x.Service<QueueProcessorService>();
    x.RunAsLocalSystem();
    x.SetServiceName("QueueProcessor");
    x.SetDisplayName("Queue Processor");
    x.EnablePauseAndContinue();
    x.StartAutomatically();
});
```

## Service Recovery Configuration

Configure automatic recovery actions when the service fails.

```csharp
using System;
using Topshelf;

HostFactory.Run(x =>
{
    x.Service<DataSyncService>(s =>
    {
        s.ConstructUsing(name => new DataSyncService());
        s.WhenStarted((service, hc) => service.Start(hc));
        s.WhenStopped((service, hc) => service.Stop(hc));
    });

    x.RunAsLocalSystem();
    x.SetServiceName("DataSyncService");
    x.SetDisplayName("Data Synchronization Service");
    x.SetDescription("Synchronizes data between systems.");

    // Automatic recovery on failure
    x.EnableServiceRecovery(recovery =>
    {
        recovery.RestartService(delayInMinutes: 1);  // First failure: restart after 1 min
        recovery.RestartService(delayInMinutes: 5);  // Second failure: restart after 5 min
        recovery.RestartService(delayInMinutes: 10); // Subsequent failures: restart after 10 min

        // Reset failure count after this period
        recovery.SetResetPeriod(days: 1);

        // Run a custom program on failure
        recovery.RunProgram(delayInMinutes: 0,
            command: @"C:\scripts\notify-admin.bat");
    });

    x.StartAutomatically();
    x.EnableShutdown();
});
```

## Dependency Injection Integration

Use a DI container with Topshelf for production services.

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Topshelf;

public class MonitoringService
{
    private readonly ILogger<MonitoringService> _logger;
    private readonly IHealthChecker _healthChecker;
    private Timer? _timer;

    public MonitoringService(
        ILogger<MonitoringService> logger,
        IHealthChecker healthChecker)
    {
        _logger = logger;
        _healthChecker = healthChecker;
    }

    public bool Start(HostControl hostControl)
    {
        _logger.LogInformation("Monitoring service started");
        _timer = new Timer(
            async _ => await _healthChecker.CheckAsync(),
            null,
            TimeSpan.Zero,
            TimeSpan.FromSeconds(30));
        return true;
    }

    public bool Stop(HostControl hostControl)
    {
        _logger.LogInformation("Monitoring service stopped");
        _timer?.Dispose();
        return true;
    }
}

// Program.cs with DI
public class Program
{
    public static int Main(string[] args)
    {
        var services = new ServiceCollection();
        services.AddLogging(builder => builder.AddConsole());
        services.AddTransient<IHealthChecker, HttpHealthChecker>();
        services.AddTransient<MonitoringService>();

        var provider = services.BuildServiceProvider();

        var exitCode = HostFactory.Run(x =>
        {
            x.Service<MonitoringService>(s =>
            {
                s.ConstructUsing(name => provider.GetRequiredService<MonitoringService>());
                s.WhenStarted((service, hc) => service.Start(hc));
                s.WhenStopped((service, hc) => service.Stop(hc));
            });

            x.RunAsLocalSystem();
            x.SetServiceName("MonitoringService");
            x.SetDisplayName("Health Monitoring Service");
            x.StartAutomatically();
        });

        return (int)exitCode;
    }
}

public interface IHealthChecker
{
    Task CheckAsync();
}

public class HttpHealthChecker : IHealthChecker
{
    public async Task CheckAsync() => await Task.CompletedTask;
}
```

## Command-Line Service Management

Topshelf provides built-in command-line arguments for installing, uninstalling, and managing the service.

```
# Run as console (development)
MyService.exe

# Install as Windows service
MyService.exe install

# Install with custom credentials
MyService.exe install -username:DOMAIN\User -password:P@ssw0rd

# Start the service
MyService.exe start

# Stop the service
MyService.exe stop

# Uninstall the service
MyService.exe uninstall

# Show help
MyService.exe help
```

## Topshelf vs Modern .NET Hosting

| Feature | Topshelf | BackgroundService + WindowsServices |
|---------|----------|-------------------------------------|
| .NET Framework | Yes | No |
| .NET 6+ | Limited | Yes |
| Linux support | No | Yes (with Systemd) |
| CLI install/uninstall | Built-in | Manual (`sc.exe` or installer) |
| Service recovery | Fluent API | Windows Service Manager |
| Pause/continue | Built-in | Manual |
| DI integration | Manual | Built-in |
| Console mode | Automatic | Automatic |
| Active development | Maintenance | Active |

## Migration Path to Modern .NET

For new projects or migrations, convert Topshelf services to BackgroundService:

```csharp
// Modern equivalent using BackgroundService
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "DataSyncService";
});

builder.Services.AddHostedService<DataSyncWorker>();

using var host = builder.Build();
await host.RunAsync();

public class DataSyncWorker : BackgroundService
{
    private readonly ILogger<DataSyncWorker> _logger;

    public DataSyncWorker(ILogger<DataSyncWorker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(5));
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            _logger.LogInformation("Synchronizing data...");
            // Sync logic here
        }
    }
}
```

## Best Practices

1. **Use Topshelf only for .NET Framework services or legacy maintenance** -- for new .NET 6+ services, prefer `BackgroundService` with `AddWindowsService()`.
2. **Always return `true` from `Start` and `Stop`** unless there is a genuine startup failure that should prevent the service from running.
3. **Configure service recovery** with `EnableServiceRecovery` so the service restarts automatically after crashes without manual intervention.
4. **Test as a console application first** by running the executable directly -- Topshelf automatically detects console mode vs. service mode.
5. **Use `RunAsLocalSystem()` for services that do not need network access** and `RunAsNetworkService()` for services that need to authenticate on the network.
6. **Set `StartAutomatically()`** for production services so they start on system boot without manual intervention.
7. **Enable `EnableShutdown()`** so the service responds properly to system shutdown events and has time to clean up resources.
8. **Use the `HostControl` parameter in `Start`/`Stop`** to request service stop from within the service itself (e.g., `hostControl.Stop()` on unrecoverable error).
9. **Integrate a DI container** by building the service provider before `HostFactory.Run` and resolving the service inside `ConstructUsing`.
10. **Plan migration to BackgroundService** for any Topshelf service that will be upgraded to .NET 6+, since Topshelf is in maintenance mode and the modern hosting model is more capable and actively maintained.
