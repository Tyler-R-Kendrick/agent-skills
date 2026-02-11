# Serilog

## Overview
Serilog is a structured logging library that makes it easy to record and query log data.

## Example
```csharp
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/app.txt", rollingInterval: RollingInterval.Day)
    .WriteTo.Seq("http://localhost:5341")
    .CreateLogger();

Log.Information("Processing order {OrderId} for {CustomerId}", 
    orderId, customerId);

// ASP.NET Core
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));
```

## Best Practices
- Use structured logging with message templates
- Enrich with context (correlation IDs, user info)
- Configure different sinks for different log levels
- Use Serilog.AspNetCore for web apps
- Avoid string interpolation in log messages
