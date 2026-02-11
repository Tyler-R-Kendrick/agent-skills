---
name: serilog
description: >
  Guidance for Serilog structured logging library in .NET.
  USE FOR: Serilog sink configuration, structured event logging, log enrichment, ASP.NET Core request logging, Serilog expressions and filtering, Seq/Elasticsearch/Application Insights integration.
  DO NOT USE FOR: Microsoft.Extensions.Logging abstractions (use extensions-logging), NLog targets and routing (use nlog), OpenTelemetry log export (use otlp-logging).
license: MIT
metadata:
  displayName: "Serilog"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Serilog

## Overview

Serilog is a structured logging library for .NET that captures log events as structured data rather than plain text. Each log event retains its original property values as queryable fields, making it possible to search for `OrderId = "ORD-123"` instead of parsing substrings. Serilog uses message templates (not `string.Format` or interpolation) to define the event structure, and a rich ecosystem of sinks to deliver log events to consoles, files, Seq, Elasticsearch, Application Insights, and dozens of other destinations.

Serilog integrates with ASP.NET Core through `Serilog.AspNetCore`, replacing the default logging pipeline with Serilog's structured pipeline while remaining compatible with `ILogger<T>` injection.

## ASP.NET Core Integration

Replace the default logging with Serilog using the two-stage initialization pattern, which captures startup errors before the host is fully built.

```csharp
using Microsoft.AspNetCore.Builder;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) =>
        configuration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.File(
                "logs/app-.txt",
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 30));

    var app = builder.Build();
    app.UseSerilogRequestLogging();
    app.MapGet("/", () => "Hello");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```

## Structured Logging with Message Templates

Message templates preserve property names and types as structured data.

```csharp
using Serilog;

namespace MyApp.Services;

public class OrderService
{
    private readonly ILogger _logger;

    public OrderService(ILogger logger)
    {
        _logger = logger.ForContext<OrderService>();
    }

    public void Process(string orderId, int itemCount, decimal total)
    {
        // Properties: OrderId, ItemCount, Total
        _logger.Information(
            "Processing order {OrderId} with {ItemCount} items totaling {Total:C}",
            orderId, itemCount, total);

        // Destructure operator @ captures full object structure
        var orderDetails = new { orderId, itemCount, total };
        _logger.Information(
            "Order details: {@OrderDetails}", orderDetails);

        // Stringify operator $ calls ToString()
        var status = OrderStatus.Pending;
        _logger.Information(
            "Order status: {$Status}", status);
    }
}

public enum OrderStatus { Pending, Confirmed, Shipped }
```

## Log Enrichment

Enrichers add contextual properties to every log event globally or per-context.

```csharp
using Serilog;
using Serilog.Context;

// Global enrichment at configuration time
Log.Logger = new LoggerConfiguration()
    .Enrich.WithMachineName()
    .Enrich.WithEnvironmentName()
    .Enrich.WithProperty("Application", "OrderApi")
    .Enrich.FromLogContext()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] "
        + "{Message:lj} "
        + "{Properties:j}{NewLine}{Exception}")
    .CreateLogger();

// Push scoped properties via LogContext
using (LogContext.PushProperty("CorrelationId", Guid.NewGuid()))
using (LogContext.PushProperty("TenantId", "tenant-42"))
{
    Log.Information("Processing request");
    // CorrelationId and TenantId appear on this event
}
```

## Configuration via appsettings.json

Serilog supports full configuration through `Serilog.Settings.Configuration`.

```json
{
  "Serilog": {
    "Using": ["Serilog.Sinks.Console", "Serilog.Sinks.File", "Serilog.Sinks.Seq"],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft.AspNetCore": "Warning",
        "Microsoft.EntityFrameworkCore": "Warning",
        "System.Net.Http.HttpClient": "Warning"
      }
    },
    "WriteTo": [
      { "Name": "Console" },
      {
        "Name": "File",
        "Args": {
          "path": "logs/app-.txt",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30,
          "fileSizeLimitBytes": 10485760
        }
      },
      {
        "Name": "Seq",
        "Args": { "serverUrl": "http://localhost:5341" }
      }
    ],
    "Enrich": ["FromLogContext", "WithMachineName", "WithEnvironmentName"],
    "Properties": {
      "Application": "OrderApi"
    }
  }
}
```

## Request Logging Middleware

`UseSerilogRequestLogging` replaces the verbose ASP.NET Core request logging with a single structured event per request.

```csharp
using Microsoft.AspNetCore.Builder;
using Serilog;

var app = builder.Build();

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate =
        "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.000}ms";

    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        diagnosticContext.Set("UserAgent",
            httpContext.Request.Headers["User-Agent"].ToString());
        diagnosticContext.Set("UserId",
            httpContext.User.Identity?.Name ?? "anonymous");
    };

    options.GetLevel = (httpContext, elapsed, ex) =>
        ex is not null ? Serilog.Events.LogEventLevel.Error
        : httpContext.Response.StatusCode >= 500
            ? Serilog.Events.LogEventLevel.Error
        : elapsed > 5000
            ? Serilog.Events.LogEventLevel.Warning
        : Serilog.Events.LogEventLevel.Information;
});
```

## Common Sinks

| Sink | Package | Use Case |
|---|---|---|
| Console | `Serilog.Sinks.Console` | Development, container stdout |
| File | `Serilog.Sinks.File` | Local file with rolling |
| Seq | `Serilog.Sinks.Seq` | Structured log server (search/dashboards) |
| Elasticsearch | `Serilog.Sinks.Elasticsearch` | ELK stack integration |
| Application Insights | `Serilog.Sinks.ApplicationInsights` | Azure monitoring |
| Async | `Serilog.Sinks.Async` | Wrap any sink for background writes |
| OpenTelemetry | `Serilog.Sinks.OpenTelemetry` | OTLP export to collectors |

## Best Practices

1. **Use message templates instead of string interpolation** (`"Order {OrderId}"` not `$"Order {orderId}"`) so structured properties are preserved in sinks like Seq and Elasticsearch.
2. **Use the `@` destructuring operator** for complex objects (`{@Order}`) to capture their full structure, and the `$` stringify operator for enums and types where only the string representation matters.
3. **Call `Log.CloseAndFlush()`** in a `finally` block to ensure all buffered events are written before the process exits; without this, async sinks may lose the final batch.
4. **Override framework log levels** (`Microsoft.AspNetCore`, `Microsoft.EntityFrameworkCore`) to `Warning` in production to reduce high-volume noise from internal framework logging.
5. **Use `Serilog.AspNetCore`'s `UseSerilogRequestLogging()`** instead of the default ASP.NET Core request logging to get a single structured event per request with timing, status code, and custom properties.
6. **Enrich globally with `FromLogContext`** and push scoped properties (correlation ID, tenant ID) via `LogContext.PushProperty` so all downstream log events carry contextual data.
7. **Configure sinks in `appsettings.json`** via `Serilog.Settings.Configuration` so operations can add or remove sinks and adjust levels without code changes or redeployment.
8. **Wrap high-latency sinks** (file, database, network) with `Serilog.Sinks.Async` to prevent I/O from blocking the application's hot path.
9. **Avoid logging sensitive data** by using Serilog's `Destructure.ByTransforming<T>()` to mask or omit sensitive fields before they reach any sink.
10. **Use the two-stage initialization pattern** (bootstrap logger then full logger) so exceptions during host startup are captured and logged rather than lost to the void.
