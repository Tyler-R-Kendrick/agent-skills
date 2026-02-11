---
name: topshelf
description: Guidance for Topshelf Windows service hosting framework.
metadata:
  displayName: Topshelf
---

# Topshelf

## Overview
Topshelf simplifies creating and hosting Windows services using a fluent API.

## Example
```csharp
using Topshelf;

public class MyService
{
    private Timer _timer;
    
    public bool Start(HostControl hostControl)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
        return true;
    }
    
    public bool Stop(HostControl hostControl)
    {
        _timer?.Dispose();
        return true;
    }
    
    private void DoWork(object state)
    {
        // Service logic
    }
}

// Program.cs
HostFactory.Run(x =>
{
    x.Service<MyService>(s =>
    {
        s.ConstructUsing(name => new MyService());
        s.WhenStarted((service, hostControl) => service.Start(hostControl));
        s.WhenStopped((service, hostControl) => service.Stop(hostControl));
    });
    
    x.RunAsLocalSystem();
    x.SetServiceName("MyService");
    x.SetDisplayName("My Service");
    x.SetDescription("My Service Description");
});
```

## Best Practices
- Handle start/stop gracefully
- Configure appropriate recovery options
- Implement proper logging
- Test as console app first
- Consider modern alternatives (BackgroundService)
