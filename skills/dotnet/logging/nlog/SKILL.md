---
name: nlog
description: >
  Guidance for NLog logging framework in .NET.
  USE FOR: NLog target configuration, layout renderers, structured logging with NLog, async logging, conditional routing, custom targets, NLog integration with ASP.NET Core.
  DO NOT USE FOR: Microsoft.Extensions.Logging abstractions (use extensions-logging), Serilog sinks and enrichers (use serilog), OpenTelemetry log export (use otlp-logging).
license: MIT
metadata:
  displayName: "NLog"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "NLog Official Website"
    url: "https://nlog-project.org/"
  - title: "NLog GitHub Repository"
    url: "https://github.com/NLog/NLog"
  - title: "NLog NuGet Package"
    url: "https://www.nuget.org/packages/NLog"
---

# NLog

## Overview

NLog is a mature, flexible logging framework for .NET that supports a wide range of log targets (file, database, email, network, cloud services) with powerful routing rules, layout renderers, and filtering. It can be configured entirely via XML or JSON configuration files, allowing operations teams to adjust logging without code changes. NLog integrates with `Microsoft.Extensions.Logging` through the `NLog.Extensions.Logging` package, making it usable as a provider in ASP.NET Core and generic host applications.

NLog's key differentiator is its routing architecture: log rules can direct different log levels from different sources to different targets, enabling scenarios like sending errors to email while writing debug logs to file, all from the same configuration.

## ASP.NET Core Integration

Use `NLog.Web.AspNetCore` to integrate NLog as the logging provider for ASP.NET Core.

```csharp
using Microsoft.AspNetCore.Builder;
using NLog;
using NLog.Web;

// Load NLog configuration early
var logger = LogManager.Setup()
    .LoadConfigurationFromAppSettings()
    .GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var app = builder.Build();
    app.MapGet("/", () => "Hello");
    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Application stopped due to exception");
    throw;
}
finally
{
    LogManager.Shutdown();
}
```

## XML Configuration

NLog uses `nlog.config` for declarative configuration of targets, rules, and layouts.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      autoReload="true"
      throwConfigExceptions="true">

  <targets>
    <target name="console" xsi:type="ColoredConsole"
            layout="${longdate}|${level:uppercase=true}|${logger}|${message}${onexception:inner=${newline}${exception:format=tostring}}" />

    <target name="file" xsi:type="AsyncWrapper">
      <target xsi:type="File"
              fileName="logs/app-${shortdate}.log"
              layout="${longdate}|${level:uppercase=true}|${logger}|${message}${onexception:inner=${newline}${exception:format=tostring}}"
              archiveAboveSize="10485760"
              maxArchiveFiles="10" />
    </target>

    <target name="jsonFile" xsi:type="File"
            fileName="logs/app-${shortdate}.json">
      <layout xsi:type="JsonLayout">
        <attribute name="time" layout="${longdate}" />
        <attribute name="level" layout="${level:uppercase=true}" />
        <attribute name="logger" layout="${logger}" />
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=tostring}" />
        <attribute name="properties" encode="false">
          <layout xsi:type="JsonLayout" includeEventProperties="true" />
        </attribute>
      </layout>
    </target>

    <target name="database" xsi:type="Database"
            dbProvider="Microsoft.Data.SqlClient.SqlConnection, Microsoft.Data.SqlClient"
            connectionString="${configsetting:name=ConnectionStrings.Logging}">
      <commandText>
        INSERT INTO Logs (Timestamp, Level, Logger, Message, Exception)
        VALUES (@timestamp, @level, @logger, @message, @exception)
      </commandText>
      <parameter name="@timestamp" layout="${longdate}" />
      <parameter name="@level" layout="${level}" />
      <parameter name="@logger" layout="${logger}" />
      <parameter name="@message" layout="${message}" />
      <parameter name="@exception" layout="${exception:format=tostring}" />
    </target>
  </targets>

  <rules>
    <logger name="Microsoft.*" maxlevel="Info" final="true" />
    <logger name="*" minlevel="Info" writeTo="console" />
    <logger name="*" minlevel="Debug" writeTo="file" />
    <logger name="*" minlevel="Debug" writeTo="jsonFile" />
    <logger name="*" minlevel="Error" writeTo="database" />
  </rules>
</nlog>
```

## Structured Logging

NLog supports structured logging with named parameters that can be captured as properties in JSON and database targets.

```csharp
using NLog;

namespace MyApp.Services;

public class OrderService
{
    private static readonly Logger Logger =
        LogManager.GetCurrentClassLogger();

    public void ProcessOrder(string orderId, decimal total, int itemCount)
    {
        Logger.Info(
            "Processing order {OrderId} with {ItemCount} items totaling {Total}",
            orderId, itemCount, total);

        Logger.WithProperty("OrderId", orderId)
            .WithProperty("CustomerId", "C-1234")
            .Info("Order enriched with customer context");
    }

    public void HandleError(string orderId, Exception ex)
    {
        Logger.Error(ex,
            "Order {OrderId} processing failed", orderId);
    }
}
```

## Scoped Logging with MappedDiagnosticsLogicalContext

NLog provides `MappedDiagnosticsLogicalContext` (MDLC) for async-safe scoped properties, similar to `ILogger.BeginScope`.

```csharp
using NLog;

namespace MyApp.Services;

public class RequestPipeline
{
    private static readonly Logger Logger =
        LogManager.GetCurrentClassLogger();

    public async Task HandleRequestAsync(
        string requestId, string tenantId)
    {
        using (MappedDiagnosticsLogicalContext.SetScoped(
            "RequestId", requestId))
        using (MappedDiagnosticsLogicalContext.SetScoped(
            "TenantId", tenantId))
        {
            Logger.Info("Request started");
            await ProcessAsync();
            Logger.Info("Request completed");
            // Both log entries include RequestId and TenantId
        }
    }

    private Task ProcessAsync() => Task.CompletedTask;
}
```

Use the `${mdlc}` layout renderer to include scoped properties:

```xml
<target name="console" xsi:type="Console"
        layout="${longdate}|${mdlc:item=RequestId}|${message}" />
```

## Programmatic Configuration

Configure NLog entirely in code when XML configuration is not desired.

```csharp
using NLog;
using NLog.Config;
using NLog.Targets;

var config = new LoggingConfiguration();

var consoleTarget = new ConsoleTarget("console")
{
    Layout = "${longdate}|${level:uppercase=true}|${logger}|${message}"
};

var fileTarget = new FileTarget("file")
{
    FileName = "logs/app-${shortdate}.log",
    ArchiveAboveSize = 10 * 1024 * 1024,
    MaxArchiveFiles = 10
};

config.AddTarget(consoleTarget);
config.AddTarget(fileTarget);

config.AddRule(NLog.LogLevel.Info, NLog.LogLevel.Fatal, consoleTarget);
config.AddRule(NLog.LogLevel.Debug, NLog.LogLevel.Fatal, fileTarget);

LogManager.Configuration = config;
```

## NLog Target Types

| Target | Use Case | Async Recommended |
|---|---|---|
| File | Local log files with rotation | Yes |
| Console / ColoredConsole | Development output | No |
| Database | SQL Server, PostgreSQL, etc. | Yes |
| Mail | Email alerts for critical errors | Yes |
| Network | Remote syslog or TCP/UDP endpoint | Yes |
| EventLog | Windows Event Log | No |
| NLogViewer | Real-time viewer (Chainsaw/Sentinel) | Yes |
| Null | Discard (for benchmarking) | No |

## Best Practices

1. **Wrap file and database targets with `AsyncWrapper`** to prevent I/O latency from blocking application threads; NLog's async wrappers batch and flush writes on a background thread.
2. **Use `autoReload="true"`** in `nlog.config` so logging configuration changes take effect without restarting the application, enabling runtime verbosity adjustments.
3. **Set `final="true"` on framework noise rules** (e.g., `<logger name="Microsoft.*" maxlevel="Info" final="true" />`) to prevent framework logs from reaching expensive targets.
4. **Use structured logging parameters** (`{OrderId}`) instead of string concatenation so JSON and database targets can index and query individual properties.
5. **Configure `archiveAboveSize` and `maxArchiveFiles`** on file targets to prevent unbounded disk growth; set archive size to 10 MB and retain 10-30 archive files.
6. **Use `MappedDiagnosticsLogicalContext` (MDLC)** for correlation IDs in async workflows instead of the legacy `MappedDiagnosticsContext` (MDC), which is not async-safe.
7. **Call `LogManager.Shutdown()`** in the application's finally block or `IHostApplicationLifetime.ApplicationStopping` to flush all buffered log entries before process exit.
8. **Use `throwConfigExceptions="true"`** during development to catch configuration errors (typos in target names, invalid layout renderers) at startup rather than silently losing logs.
9. **Separate log rules by severity** so that `Error` and `Critical` logs reach alerting targets (email, PagerDuty) while `Debug` logs go only to file, reducing alert noise.
10. **Prefer NLog's `ILogger` integration via `NLog.Extensions.Logging`** over direct `LogManager.GetCurrentClassLogger()` in new projects to maintain compatibility with the `Microsoft.Extensions.Logging` abstraction.
