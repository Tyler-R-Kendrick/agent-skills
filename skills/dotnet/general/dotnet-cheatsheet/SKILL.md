---
name: dotnet-cheatsheet
description: Guidance for modern .NET code patterns and libraries. Use when working with dotnet cheatsheet.
license: MIT
metadata:
  displayName: ".NET Cheatsheet (Modern)"
  author: "Tyler-R-Kendrick"
references:
  - title: ".NET Documentation on Microsoft Learn"
    url: "https://learn.microsoft.com/dotnet/"
  - title: ".NET GitHub Repository"
    url: "https://github.com/dotnet/runtime"
---

# .NET Cheatsheet (Modern)

Use these guidelines to write modern .NET code with testability, reliability, and observability.

## Core guidance

- Avoid static class access in application code. Wrap static APIs behind interfaces and inject them. This makes code mockable and avoids global state.
- Prefer the Generic Host for all applications, even small tools. Standardize on DI, configuration, logging, and lifetime.
- Use abstractions for IO (`System.IO.Abstractions`) and test through interfaces.
- Use CommunityToolkit `Guard` methods for guard clauses and keep them inside type boundaries.
- Prefer `record` types for DTOs and API contracts.
- Use primary constructors for classes and avoid redeclaring fields.

## Primary constructors

Use primary constructors to declare dependencies once and keep the class concise.

```csharp
public sealed class CatalogService(TimeProvider timeProvider, ILogger<CatalogService> logger)
{
	public Task PublishAsync(ValueString id, CancellationToken ct)
	{
		logger.LogInformation("Publishing {Id} at {Time}", id, timeProvider.GetUtcNow());
		return Task.CompletedTask;
	}
}
```

## Avoid direct static usage

**Why:** Static classes are hard to mock and hide dependencies.

**Pattern:** wrap static calls.

```csharp
public interface ISystemClock
{
	DateTimeOffset UtcNow { get; }
}

public sealed class SystemClock : ISystemClock
{
	public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
```

## Time providers

Use `TimeProvider` so time can be mocked and centrally controlled.

```csharp
public sealed class BillingService
{
	private readonly TimeProvider _timeProvider;

	public BillingService(TimeProvider timeProvider)
	{
		_timeProvider = timeProvider;
	}

	public DateTimeOffset GetChargeTimestamp() => _timeProvider.GetUtcNow();
}

builder.Services.AddSingleton(TimeProvider.System);
```

## Parse, don't validate

Define explicit types that can only represent valid values. Use these in APIs to avoid null/whitespace checks.

```csharp
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using CommunityToolkit.Diagnostics;

[DebuggerDisplay("{Value}")]
public readonly record struct ValueString
{
	public string Value { get; }

	private ValueString(string value)
	{
		// Guard clauses remain inside the type boundary.
		Value = Guard.IsNotNullOrWhiteSpace(value);
	}

	public static ValueString Parse(string value) => new(value);

	public static bool TryParse(
		[NotNullWhen(true)] string? value,
		[NotNullWhen(true)] out ValueString result)
	{
		if (string.IsNullOrWhiteSpace(value))
		{
			result = default;
			return false;
		}

		result = new ValueString(value);
		return true;
	}

	public static implicit operator string(ValueString value) => value.Value;

	public static explicit operator ValueString(string value) => Parse(value);

	public override string ToString() => Value;
}
```

**Guidance:**
- Replace guard clauses in call sites with domain-specific value types (like `ValueString`).
- Use guard clauses only inside the type constructor/factory methods.
- Prefer CommunityToolkit `Guard` for consistency and better static analysis hints.

## Isolated Storage

Use `IsolatedStorageFile` to store per-user or per-application data securely.

```csharp
using System.IO;
using System.IO.IsolatedStorage;

public interface IUserSettingsStore
{
	Task SaveAsync(string key, string value, CancellationToken token);
	Task<string?> ReadAsync(string key, CancellationToken token);
}

public sealed class IsolatedStorageUserSettingsStore : IUserSettingsStore
{
	public async Task SaveAsync(string key, string value, CancellationToken token)
	{
		using var store = IsolatedStorageFile.GetUserStoreForAssembly();
		using var stream = new IsolatedStorageFileStream(key, FileMode.Create, store);
		using var writer = new StreamWriter(stream);
		await writer.WriteAsync(value.AsMemory(), token);
	}

	public async Task<string?> ReadAsync(string key, CancellationToken token)
	{
		using var store = IsolatedStorageFile.GetUserStoreForAssembly();
		if (!store.FileExists(key))
		{
			return null;
		}

		using var stream = new IsolatedStorageFileStream(key, FileMode.Open, store);
		using var reader = new StreamReader(stream);
		return await reader.ReadToEndAsync(token);
	}
}
```

## AppContext opt-out features

Use `AppContext` switches to toggle compatibility and feature flags.

```csharp
if (AppContext.TryGetSwitch("MyApp.DisableLegacyBehavior", out var disabled) && disabled)
{
	// Legacy behavior is disabled.
}
```

## Resources

Use resource files (`.resx`) with `IStringLocalizer` or `ResourceManager`.

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

public sealed class MyService
{
	private readonly IStringLocalizer<MyService> _localizer;

	public MyService(IStringLocalizer<MyService> localizer)
	{
		_localizer = localizer;
	}

	public string GetMessage() => _localizer["WelcomeMessage"];
}
```

## Primitives and change notifications

Use `IChangeToken` and `ChangeToken` for configuration or file change notifications.

```csharp
using Microsoft.Extensions.Primitives;

ChangeToken.OnChange(
	() => configuration.GetReloadToken(),
	() => logger.LogInformation("Configuration reloaded"));
```

## Service discovery

Add service discovery for HTTP clients.

```csharp
builder.Services.AddServiceDiscovery();
builder.Services.AddHttpClient("catalog")
	.AddServiceDiscovery();
```

## Resiliency

Use the resilience pipeline for retries, timeouts, and hedging.

```csharp
builder.Services.AddResiliencePipeline("catalog", pipeline =>
{
	pipeline.AddRetry(new() { MaxRetryAttempts = 3 });
	pipeline.AddTimeout(TimeSpan.FromSeconds(5));
});

builder.Services.AddHttpClient("catalog")
	.AddResilienceHandler("catalog");
```

## Generic Host

Use the Host or WebApplication builder for consistent setup.

```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();

using var host = builder.Build();
await host.RunAsync();
```

**Guidance:**
- Prefer top-level statements in `Program.cs` instead of a `Main` method.

## Logging

Use `ILogger` with the `LoggerMessage` source-generation pattern. Add conditional compilation symbols per log level to remove calls when disabled.

```csharp
using System.Diagnostics;
using Microsoft.Extensions.Logging;

public static partial class Log
{
	[LoggerMessage(EventId = 1001, Level = LogLevel.Information, Message = "Processed order {OrderId}")]
	public static partial void OrderProcessed(ILogger logger, string orderId);

	[LoggerMessage(EventId = 2001, Level = LogLevel.Debug, Message = "Raw payload: {Payload}")]
	[Conditional("LOG_DEBUG")]
	public static partial void PayloadDebug(ILogger logger, string payload);

	[LoggerMessage(EventId = 3001, Level = LogLevel.Trace, Message = "Trace state: {State}")]
	[Conditional("LOG_TRACE")]
	public static partial void TraceState(ILogger logger, string state);
}
```

Configure logging for all levels in configuration.

```json
{
  "Logging": {
	"LogLevel": {
	  "Default": "Trace",
	  "Microsoft": "Information",
	  "Microsoft.Hosting.Lifetime": "Information"
	}
  }
}
```

**Guidance:**
- Define compile symbols like `LOG_TRACE`, `LOG_DEBUG`, `LOG_INFORMATION` in build configs to remove calls at compile time.
- Use structured logging with event IDs for observability and compliance.

## Configuration

Use `IConfiguration` and options binding.

```csharp
builder.Services.Configure<MyOptions>(builder.Configuration.GetSection("MyOptions"));
```

## Dependency injection

Register services with lifetimes that match behavior.

```csharp
builder.Services.AddSingleton<ISystemClock, SystemClock>();
builder.Services.AddScoped<IMyService, MyService>();
builder.Services.AddTransient<IUserSettingsStore, IsolatedStorageUserSettingsStore>();
```

**Guidance:**
- Centralize registrations in a static extension class instead of inline in `Program.cs`.

```csharp
public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddAppServices(this IServiceCollection services)
	{
		services.AddSingleton<ISystemClock, SystemClock>();
		services.AddScoped<IMyService, MyService>();
		services.AddTransient<IUserSettingsStore, IsolatedStorageUserSettingsStore>();
		return services;
	}
}
```

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddAppServices();
```

## ORMs and official frameworks

**Defaults:**
- Use EF Core for most database access. Prefer migrations and `DbContext` per request.
- Use Dapper only for targeted, read-heavy, or latency-critical queries.

**Official framework defaults to mention in app architecture:**
- ASP.NET Core (Minimal APIs, MVC, Razor Pages) for web.
- EF Core for data access.
- gRPC for service-to-service contracts.
- SignalR for realtime messaging.
- Orleans for distributed actor workloads.
- Blazor for web UI and MAUI for cross-platform clients.

For details and examples, use the library-specific skills for each framework.

## Eventing and MediatR

**Eventing defaults:**
- Prefer established .NET messaging frameworks: MassTransit, NServiceBus, or Wolverine.
- Prefer outbox patterns when publishing domain events from transactional writes.

**MediatR:**
- Use for in-process request/response and notifications to decouple handlers.
- Keep it thin; avoid deep pipelines unless you need cross-cutting concerns.

For details and examples, use the library-specific skills for eventing and MediatR.

## AI libraries (official)

**Defaults:**
- Use `Microsoft.Extensions.AI` for provider-agnostic abstractions and DI-friendly clients.
- Prefer `Azure.AI.Inference` for Azure-hosted model access; avoid provider-specific SDKs unless required.
- Use the official `a2a` and `mcp` packages for agent-to-agent and model context protocol integrations.
- Prefer Agent Framework for orchestration and tools; treat Semantic Kernel as legacy.

For details and examples, use the AI library-specific skills.

## Identity (latest Microsoft approach)

Use ASP.NET Core Identity with Identity API endpoints for modern minimal APIs. Rely on `UserManager` and `SignInManager` and avoid custom password handling.

For details and examples, use the ASP.NET Core Identity skill.

## IO abstractions

Use `System.IO.Abstractions` or your own interfaces around IO.

For details and examples, use the System.IO.Abstractions skill.

## File providers

Use `IFileProvider` APIs for abstracted file access (physical, embedded, or composite sources).

For details and examples, use the File Provider skill.

## Streams, pipes, channels, and async streams

- Use `System.IO.Pipelines` for high-throughput streaming and parsing.
- Use `Channel<T>` for producer/consumer queues and backpressure.
- Prefer `IAsyncEnumerable<T>` for streaming data in async flows.

For details and examples, use the System.IO.Pipelines, Channels, and IAsyncEnumerable skills.

## Reactive Extensions

Use Rx for event streams, UI events, and composition of asynchronous signals.

For details and examples, use the Reactive Extensions skill.

## Single-file executables (C#)

Use .NET 10 file-based apps with file-level directives for SDKs, packages, and properties.

```csharp
#!/usr/bin/dotnet run
#:sdk Microsoft.NET.Sdk
#:package Humanizer@2.14.1
#:property LangVersion preview

using Humanizer;

var dotNet9Released = DateTimeOffset.Parse("2024-12-03");
var since = DateTimeOffset.Now - dotNet9Released;

Console.WriteLine($"It has been {since.Humanize()} since .NET 9 was released.");
```

**Guidance:**
- Run with `dotnet run app.cs`.
- Make executable on Unix with `chmod +x app.cs` and run `./app.cs`.
- Convert to a project with `dotnet project convert app.cs`.

## Compliance

Use compliance extensions for data classification and policy enforcement.

```csharp
builder.Services.AddCompliance();
```

## Caching

Use `IMemoryCache` or distributed caching abstractions.

```csharp
builder.Services.AddMemoryCache();
```

## Globalization and Localization

Configure cultures and localization at host startup.

```csharp
builder.Services.AddLocalization();

var app = builder.Build();
var supportedCultures = new[] { "en-US", "fr-FR" };

var localizationOptions = new RequestLocalizationOptions()
	.SetDefaultCulture(supportedCultures[0])
	.AddSupportedCultures(supportedCultures)
	.AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```