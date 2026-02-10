---
name: dotnet-worker-services
description: Guidance for building .NET worker services and background tasks. Use when creating long-running background services.
license: MIT
metadata:
  displayName: ".NET Worker Services"
  author: "Tyler-R-Kendrick"
---

# .NET Worker Services

## Overview
Worker services are long-running background applications that can run as Windows Services, Linux daemons, or containers. Perfect for message processing, scheduled tasks, and data sync operations.

## Creating a Worker Service

```bash
dotnet new worker -n MyWorkerService
```

## Basic Worker

```csharp
public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    
    public Worker(ILogger<Worker> logger)
    {
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }
    }
}
```

## Program.cs Setup

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();

// Add dependencies
builder.Services.AddSingleton<IDataService, DataService>();
builder.Services.AddHttpClient<IApiClient, ApiClient>();

var host = builder.Build();
await host.RunAsync();
```

## Timed Background Service

```csharp
public class TimedWorker : BackgroundService
{
    private readonly ILogger<TimedWorker> _logger;
    private readonly TimeProvider _timeProvider;
    private readonly IDataService _dataService;
    
    public TimedWorker(
        ILogger<TimedWorker> logger,
        TimeProvider timeProvider,
        IDataService dataService)
    {
        _logger = logger;
        _timeProvider = timeProvider;
        _dataService = dataService;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(5), _timeProvider);
        
        while (!stoppingToken.IsCancellationRequested &&
               await timer.WaitForNextTickAsync(stoppingToken))
        {
            await DoWorkAsync(stoppingToken);
        }
    }
    
    private async Task DoWorkAsync(CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Processing data at: {time}", _timeProvider.GetUtcNow());
            await _dataService.ProcessAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing data");
        }
    }
}
```

## Queue-Based Worker

```csharp
public class QueueWorker : BackgroundService
{
    private readonly ILogger<QueueWorker> _logger;
    private readonly IMessageQueue _queue;
    
    public QueueWorker(ILogger<QueueWorker> logger, IMessageQueue queue)
    {
        _logger = logger;
        _queue = queue;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var message in _queue.ReadAllAsync(stoppingToken))
        {
            try
            {
                _logger.LogInformation("Processing message: {messageId}", message.Id);
                await ProcessMessageAsync(message, stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to process message: {messageId}", message.Id);
                await _queue.RequeueAsync(message, stoppingToken);
            }
        }
    }
    
    private async Task ProcessMessageAsync(Message message, CancellationToken cancellationToken)
    {
        // Process message
        await Task.Delay(1000, cancellationToken);
    }
}
```

## Scoped Service Pattern

```csharp
public class ScopedWorker : BackgroundService
{
    private readonly ILogger<ScopedWorker> _logger;
    private readonly IServiceProvider _serviceProvider;
    
    public ScopedWorker(
        ILogger<ScopedWorker> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(1));
        
        while (!stoppingToken.IsCancellationRequested &&
               await timer.WaitForNextTickAsync(stoppingToken))
        {
            await using var scope = _serviceProvider.CreateAsyncScope();
            
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var service = scope.ServiceProvider.GetRequiredService<IOrderService>();
            
            await service.ProcessPendingOrdersAsync(stoppingToken);
        }
    }
}
```

## Graceful Shutdown

```csharp
public class GracefulWorker : BackgroundService
{
    private readonly ILogger<GracefulWorker> _logger;
    
    public GracefulWorker(ILogger<GracefulWorker> logger)
    {
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await ProcessBatchAsync(stoppingToken);
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Worker cancellation requested");
        }
        finally
        {
            _logger.LogInformation("Worker shutting down gracefully");
        }
    }
    
    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Worker stopping...");
        
        // Perform cleanup
        await CleanupAsync(cancellationToken);
        
        await base.StopAsync(cancellationToken);
    }
    
    private async Task ProcessBatchAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Processing batch");
        await Task.Delay(100, cancellationToken);
    }
    
    private async Task CleanupAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Cleaning up resources");
        await Task.Delay(100, cancellationToken);
    }
}
```

## Windows Service

Install as Windows Service:

```bash
# Publish
dotnet publish -c Release

# Install
sc create MyWorkerService binPath="C:\Path\To\MyWorkerService.exe"

# Start
sc start MyWorkerService

# Stop
sc stop MyWorkerService

# Delete
sc delete MyWorkerService
```

Or use the package:

```bash
dotnet add package Microsoft.Extensions.Hosting.WindowsServices
```

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "My Worker Service";
});

var host = builder.Build();
await host.RunAsync();
```

## Linux Systemd Service

```bash
# Create service file: /etc/systemd/system/myworker.service
[Unit]
Description=My Worker Service

[Service]
Type=notify
ExecStart=/usr/bin/dotnet /opt/myworker/MyWorkerService.dll
WorkingDirectory=/opt/myworker
Restart=always
RestartSec=10
SyslogIdentifier=myworker
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

Add systemd support:

```bash
dotnet add package Microsoft.Extensions.Hosting.Systemd
```

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();
builder.Services.AddSystemd();

var host = builder.Build();
await host.RunAsync();
```

## Configuration

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "WorkerSettings": {
    "ProcessingIntervalSeconds": 30,
    "BatchSize": 100
  }
}
```

```csharp
public class WorkerSettings
{
    public int ProcessingIntervalSeconds { get; set; } = 30;
    public int BatchSize { get; set; } = 100;
}

// Register
builder.Services.Configure<WorkerSettings>(
    builder.Configuration.GetSection("WorkerSettings"));

// Use
public class Worker : BackgroundService
{
    private readonly IOptions<WorkerSettings> _settings;
    
    public Worker(IOptions<WorkerSettings> settings)
    {
        _settings = settings;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var interval = TimeSpan.FromSeconds(_settings.Value.ProcessingIntervalSeconds);
        // ...
    }
}
```

## Health Checks

```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();
builder.Services.AddHealthChecks()
    .AddCheck<WorkerHealthCheck>("worker");

// Optional: expose health endpoint
builder.Services.AddSingleton<IHostedService, HealthCheckHostedService>();

var host = builder.Build();
await host.RunAsync();
```

```csharp
public class WorkerHealthCheck : IHealthCheck
{
    private readonly IWorkerStatus _workerStatus;
    
    public WorkerHealthCheck(IWorkerStatus workerStatus)
    {
        _workerStatus = workerStatus;
    }
    
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var isHealthy = _workerStatus.IsRunning && 
                       _workerStatus.LastProcessedTime > DateTimeOffset.UtcNow.AddMinutes(-5);
        
        return Task.FromResult(isHealthy
            ? HealthCheckResult.Healthy("Worker is running")
            : HealthCheckResult.Unhealthy("Worker is not responding"));
    }
}
```

## Multiple Workers

```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<DataSyncWorker>();
builder.Services.AddHostedService<EmailWorker>();
builder.Services.AddHostedService<CleanupWorker>();

var host = builder.Build();
await host.RunAsync();
```

## Parallel Processing

```csharp
public class ParallelWorker : BackgroundService
{
    private readonly ILogger<ParallelWorker> _logger;
    private readonly int _degreeOfParallelism = 4;
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var tasks = Enumerable.Range(0, _degreeOfParallelism)
            .Select(i => ProcessPartitionAsync(i, stoppingToken));
        
        await Task.WhenAll(tasks);
    }
    
    private async Task ProcessPartitionAsync(int partitionId, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Partition {partition} started", partitionId);
        
        while (!cancellationToken.IsCancellationRequested)
        {
            await ProcessAsync(partitionId, cancellationToken);
            await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken);
        }
    }
    
    private async Task ProcessAsync(int partitionId, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Processing partition {partition}", partitionId);
        await Task.Delay(100, cancellationToken);
    }
}
```

## Guidance

- Use `BackgroundService` base class for long-running workers.
- Inject `ILogger` for structured logging.
- Use `PeriodicTimer` for timed operations instead of `Timer`.
- Create scopes when using scoped services (like DbContext).
- Handle cancellation gracefully with `CancellationToken`.
- Override `StopAsync` for cleanup logic.
- Use configuration for intervals and thresholds.
- Add health checks to monitor worker status.
- Use `IHostedService` for workers that need full lifecycle control.
- Consider parallel processing for high-throughput scenarios.
- Use `TimeProvider` for testable time operations.
- Deploy as Windows Service, systemd service, or container.
- Monitor workers with Application Insights or similar.
- Implement retry logic for transient failures.
