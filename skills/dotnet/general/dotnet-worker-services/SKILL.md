---
description: Guidance for building .NET worker services and background tasks.
metadata:
  displayName: .NET Worker Services
---

# .NET Worker Services

## Overview
Worker services are long-running background services for processing tasks, monitoring, or scheduled jobs.

## Example
```csharp
public class ProcessingWorker : BackgroundService
{
    private readonly ILogger<ProcessingWorker> _logger;
    
    public ProcessingWorker(ILogger<ProcessingWorker> logger)
    {
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Processing at: {time}", DateTimeOffset.Now);
            await DoWork();
            await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
        }
    }
}
```

## Use Cases
- Scheduled tasks
- Message queue processing
- Health monitoring
- Data synchronization

## Best Practices
- Respect cancellation tokens
- Implement graceful shutdown
- Use scoped services properly
- Configure appropriate delays
- Handle exceptions gracefully
