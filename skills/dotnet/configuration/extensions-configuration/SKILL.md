---
name: extensions-configuration
description: >
  USE FOR: Loading application settings from JSON files, environment variables, command-line
  arguments, user secrets, Azure Key Vault, and custom providers. Binding configuration sections
  to strongly-typed options classes with validation. DO NOT USE FOR: Feature flags (use
  Microsoft.FeatureManagement), runtime state that changes per request, or secrets that should
  live exclusively in a vault without local fallback.
license: MIT
metadata:
  displayName: "Configuration"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Configuration in .NET Documentation"
    url: "https://learn.microsoft.com/dotnet/core/extensions/configuration"
  - title: "Microsoft.Extensions.Configuration NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.Extensions.Configuration"
  - title: ".NET Runtime GitHub Repository"
    url: "https://github.com/dotnet/runtime"
---

# Microsoft.Extensions.Configuration

## Overview

`Microsoft.Extensions.Configuration` is the standard configuration system for .NET applications. It provides a layered, provider-based model where configuration values are loaded from multiple sources and merged in order, with later sources overriding earlier ones. The system supports JSON files, XML files, INI files, environment variables, command-line arguments, Azure Key Vault, user secrets, and custom providers.

Configuration values are accessed through the `IConfiguration` interface, but the recommended pattern is to bind sections to strongly-typed classes using the Options pattern (`IOptions<T>`, `IOptionsSnapshot<T>`, `IOptionsMonitor<T>`). This provides compile-time safety, validation, and clean separation between configuration and business logic.

## Basic Configuration Setup

The default host builder (`Host.CreateApplicationBuilder` or `WebApplication.CreateBuilder`) automatically loads `appsettings.json`, `appsettings.{Environment}.json`, environment variables, and command-line arguments.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Additional sources can be added explicitly
builder.Configuration
    .AddJsonFile("custom-settings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables(prefix: "MYAPP_")
    .AddCommandLine(args);

var app = builder.Build();
await app.RunAsync();
```

## Strongly-Typed Options with Validation

Define a POCO class that matches the configuration section shape, then bind and validate it during startup.

```csharp
using System.ComponentModel.DataAnnotations;

public sealed class SmtpOptions
{
    public const string SectionName = "Smtp";

    [Required]
    public string Host { get; set; } = string.Empty;

    [Range(1, 65535)]
    public int Port { get; set; } = 587;

    [Required, EmailAddress]
    public string FromAddress { get; set; } = string.Empty;

    public bool UseSsl { get; set; } = true;

    [Range(1, 300)]
    public int TimeoutSeconds { get; set; } = 30;
}
```

```json
{
  "Smtp": {
    "Host": "smtp.example.com",
    "Port": 587,
    "FromAddress": "noreply@example.com",
    "UseSsl": true,
    "TimeoutSeconds": 30
  }
}
```

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddOptions<SmtpOptions>()
    .BindConfiguration(SmtpOptions.SectionName)
    .ValidateDataAnnotations()
    .ValidateOnStart(); // Fail fast if configuration is invalid

builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

var app = builder.Build();
await app.RunAsync();
```

## Consuming Options in Services

Use `IOptions<T>` for singleton-lifetime settings, `IOptionsSnapshot<T>` for scoped settings that refresh per request, and `IOptionsMonitor<T>` when you need change notifications.

```csharp
using Microsoft.Extensions.Options;

public sealed class SmtpEmailSender : IEmailSender
{
    private readonly SmtpOptions _options;

    public SmtpEmailSender(IOptions<SmtpOptions> options)
    {
        _options = options.Value;
    }

    public async Task SendAsync(string to, string subject, string body, CancellationToken ct)
    {
        using var client = new System.Net.Mail.SmtpClient(_options.Host, _options.Port)
        {
            EnableSsl = _options.UseSsl,
            Timeout = _options.TimeoutSeconds * 1000
        };

        var message = new System.Net.Mail.MailMessage(_options.FromAddress, to, subject, body);
        await client.SendMailAsync(message, ct);
    }
}
```

## IOptionsMonitor for Live Reloading

`IOptionsMonitor<T>` re-reads configuration when the underlying source changes (e.g., file modification).

```csharp
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

public sealed class DynamicRateLimiter
{
    private readonly IOptionsMonitor<RateLimitOptions> _optionsMonitor;
    private readonly ILogger<DynamicRateLimiter> _logger;

    public DynamicRateLimiter(
        IOptionsMonitor<RateLimitOptions> optionsMonitor,
        ILogger<DynamicRateLimiter> logger)
    {
        _optionsMonitor = optionsMonitor;
        _logger = logger;

        _optionsMonitor.OnChange(newOptions =>
        {
            _logger.LogInformation(
                "Rate limit updated: {MaxRequests} per {Window}s",
                newOptions.MaxRequestsPerWindow,
                newOptions.WindowSeconds);
        });
    }

    public bool IsAllowed()
    {
        RateLimitOptions current = _optionsMonitor.CurrentValue;
        // Use current.MaxRequestsPerWindow and current.WindowSeconds
        return true;
    }
}

public sealed class RateLimitOptions
{
    public int MaxRequestsPerWindow { get; set; } = 100;
    public int WindowSeconds { get; set; } = 60;
}
```

## User Secrets for Development

User secrets keep sensitive values out of source control during local development.

```bash
dotnet user-secrets init
dotnet user-secrets set "Smtp:Host" "smtp.dev.example.com"
dotnet user-secrets set "ConnectionStrings:Default" "Server=localhost;Database=mydb"
```

```csharp
var builder = Host.CreateApplicationBuilder(args);
// User secrets are added automatically when Environment is Development
// They override appsettings.json values
```

## Custom Configuration Provider

Implement a custom provider to load configuration from a database, remote API, or any other source.

```csharp
using Microsoft.Extensions.Configuration;

public sealed class DatabaseConfigurationSource : IConfigurationSource
{
    public string ConnectionString { get; set; } = string.Empty;
    public TimeSpan RefreshInterval { get; set; } = TimeSpan.FromMinutes(5);

    public IConfigurationProvider Build(IConfigurationBuilder builder)
    {
        return new DatabaseConfigurationProvider(this);
    }
}

public sealed class DatabaseConfigurationProvider : ConfigurationProvider
{
    private readonly DatabaseConfigurationSource _source;

    public DatabaseConfigurationProvider(DatabaseConfigurationSource source)
    {
        _source = source;
    }

    public override void Load()
    {
        // Load key-value pairs from the database
        using var connection = new System.Data.SqlClient.SqlConnection(_source.ConnectionString);
        connection.Open();
        using var command = new System.Data.SqlClient.SqlCommand(
            "SELECT [Key], [Value] FROM AppConfig", connection);
        using var reader = command.ExecuteReader();

        var data = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);
        while (reader.Read())
        {
            data[reader.GetString(0)] = reader.GetString(1);
        }
        Data = data;
    }
}

public static class DatabaseConfigurationExtensions
{
    public static IConfigurationBuilder AddDatabase(
        this IConfigurationBuilder builder, string connectionString)
    {
        return builder.Add(new DatabaseConfigurationSource
        {
            ConnectionString = connectionString
        });
    }
}
```

## Configuration Source Precedence

Sources are loaded in registration order. Later sources override earlier ones.

| Order | Source | Typical Use |
|---|---|---|
| 1 | `appsettings.json` | Base defaults |
| 2 | `appsettings.{Environment}.json` | Environment overrides |
| 3 | User secrets | Local development secrets |
| 4 | Environment variables | Container and CI/CD overrides |
| 5 | Command-line arguments | One-off overrides |
| 6 | Azure Key Vault / custom | Production secrets |

## Best Practices

1. Always define a dedicated options class with a `const string SectionName` for each configuration section rather than reading `IConfiguration` keys directly in business logic.
2. Call `ValidateDataAnnotations().ValidateOnStart()` on every options registration so that missing or malformed configuration causes an immediate startup failure instead of a runtime error.
3. Never store secrets in `appsettings.json`; use user secrets for development, environment variables for CI/CD, and Azure Key Vault or a similar vault for production.
4. Use `IOptionsSnapshot<T>` in scoped services (e.g., per-request in ASP.NET Core) when configuration files are set to `reloadOnChange: true` so that changes take effect without restarting.
5. Prefix environment variables with a unique application identifier (e.g., `MYAPP_`) and call `AddEnvironmentVariables("MYAPP_")` to avoid accidentally reading unrelated host variables.
6. Keep each options class focused on a single concern; split large configuration sections into multiple small classes rather than creating a monolithic settings object.
7. Write integration tests that load a test-specific `appsettings.Testing.json` via `ConfigurationBuilder` to verify that options binding and validation work correctly with realistic values.
8. Use named options (`services.Configure<T>("name", ...)`) when the same options type is used with different configuration sections, such as multiple database connections.
9. Register custom post-configuration logic with `PostConfigure<T>` to compute derived values or apply defaults that depend on other options, keeping the options class itself free of logic.
10. Log the effective configuration at startup at the `Debug` level (excluding secrets) so that misconfigured deployments can be diagnosed from logs without SSH access.
