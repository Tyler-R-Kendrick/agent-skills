---
name: extensions-primitives
description: >
  USE FOR: Reacting to configuration or file changes with IChangeToken, building custom
  change-notification providers, efficient string segmentation with StringSegment and
  StringTokenizer, and composing change signals with CompositeChangeToken. DO NOT USE FOR:
  General-purpose eventing (use System.Reactive or channels), UI data binding, or scenarios
  where full pub/sub messaging is needed.
license: MIT
metadata:
  displayName: "Microsoft.Extensions.Primitives"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Microsoft.Extensions.Primitives Documentation"
    url: "https://learn.microsoft.com/dotnet/core/extensions/primitives"
  - title: "Microsoft.Extensions.Primitives NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.Extensions.Primitives"
  - title: ".NET Runtime GitHub Repository"
    url: "https://github.com/dotnet/runtime"
---

# Microsoft.Extensions.Primitives

## Overview

`Microsoft.Extensions.Primitives` is a low-level package that provides foundational types used throughout the .NET extensions ecosystem. Its two main areas are change notification (`IChangeToken`, `ChangeToken`, `CancellationChangeToken`, `CompositeChangeToken`) and efficient string handling (`StringSegment`, `StringTokenizer`, `StringValues`).

The change token infrastructure is the mechanism that powers configuration reloading, file-watcher notifications, and options monitoring in `Microsoft.Extensions.Configuration` and `Microsoft.Extensions.FileProviders`. Understanding these types is essential when building custom configuration providers, file-watching services, or any component that needs to react to external changes without polling.

## IChangeToken and ChangeToken.OnChange

`IChangeToken` represents a signal that something has changed. `ChangeToken.OnChange` subscribes a callback that is invoked when the token fires and automatically re-subscribes for subsequent changes.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Microsoft.Extensions.Logging;

public sealed class ConfigurationWatcher
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<ConfigurationWatcher> _logger;
    private readonly IDisposable _subscription;

    public ConfigurationWatcher(
        IConfiguration configuration,
        ILogger<ConfigurationWatcher> logger)
    {
        _configuration = configuration;
        _logger = logger;

        _subscription = ChangeToken.OnChange(
            changeTokenProducer: () => _configuration.GetReloadToken(),
            listener: OnConfigurationChanged);
    }

    private void OnConfigurationChanged()
    {
        string? newValue = _configuration["FeatureFlags:MaxRetries"];
        _logger.LogInformation("Configuration reloaded. MaxRetries is now {Value}", newValue);
    }

    public void Dispose() => _subscription.Dispose();
}
```

## CancellationChangeToken

`CancellationChangeToken` wraps a `CancellationToken` to create an `IChangeToken`. This is useful when building custom providers that signal changes programmatically.

```csharp
using Microsoft.Extensions.Primitives;
using System.Threading;

public sealed class ManualChangeTokenSource
{
    private CancellationTokenSource _cts = new();

    public IChangeToken GetChangeToken()
    {
        return new CancellationChangeToken(_cts.Token);
    }

    public void SignalChange()
    {
        var previous = Interlocked.Exchange(
            ref _cts, new CancellationTokenSource());
        previous.Cancel();
        previous.Dispose();
    }
}
```

```csharp
using Microsoft.Extensions.Primitives;

// Usage
var source = new ManualChangeTokenSource();

ChangeToken.OnChange(
    () => source.GetChangeToken(),
    () => Console.WriteLine("Change detected!"));

// Trigger the notification
source.SignalChange(); // Prints: Change detected!
source.SignalChange(); // Prints: Change detected! (re-subscribes automatically)
```

## CompositeChangeToken

`CompositeChangeToken` combines multiple change tokens into one, firing when any of the underlying tokens fires.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

public sealed class MultiSourceWatcher
{
    public MultiSourceWatcher(
        IConfiguration configuration,
        IFileProvider fileProvider)
    {
        var configToken = configuration.GetReloadToken();
        var fileToken = fileProvider.Watch("data/*.json");

        var composite = new CompositeChangeToken(new List<IChangeToken>
        {
            configToken,
            fileToken
        });

        ChangeToken.OnChange(
            () => new CompositeChangeToken(new List<IChangeToken>
            {
                configuration.GetReloadToken(),
                fileProvider.Watch("data/*.json")
            }),
            () => Console.WriteLine("Configuration or data files changed"));
    }
}
```

## Building a Custom Configuration Provider with Change Tokens

A practical example that polls a database for configuration changes and signals via `IChangeToken`.

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Threading;

public sealed class PollingConfigurationProvider : ConfigurationProvider, IDisposable
{
    private readonly Timer _timer;
    private CancellationTokenSource _cts = new();
    private readonly string _connectionString;

    public PollingConfigurationProvider(string connectionString, TimeSpan interval)
    {
        _connectionString = connectionString;
        _timer = new Timer(_ => PollForChanges(), null, interval, interval);
    }

    public override void Load()
    {
        // Initial load from database
        Data = LoadFromDatabase();
    }

    private void PollForChanges()
    {
        var newData = LoadFromDatabase();
        if (!DataEquals(Data, newData))
        {
            Data = newData;
            OnReload(); // This triggers the IChangeToken
        }
    }

    private Dictionary<string, string?> LoadFromDatabase()
    {
        // Load configuration from database
        var data = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);
        // ... database query logic ...
        return data;
    }

    private static bool DataEquals(
        IDictionary<string, string?>? a,
        IDictionary<string, string?> b)
    {
        if (a is null || a.Count != b.Count) return false;
        foreach (var kvp in a)
        {
            if (!b.TryGetValue(kvp.Key, out var value) || value != kvp.Value)
                return false;
        }
        return true;
    }

    public void Dispose()
    {
        _timer.Dispose();
        _cts.Dispose();
    }
}
```

## StringSegment and StringTokenizer

`StringSegment` provides a zero-allocation view into a string, and `StringTokenizer` splits strings without allocating substrings.

```csharp
using Microsoft.Extensions.Primitives;

// StringSegment avoids allocations for substring operations
StringSegment segment = new StringSegment("Content-Type: application/json", 14, 16);
// segment.Value == "application/json"
// segment.Length == 16

bool isJson = segment.Equals("application/json", StringComparison.OrdinalIgnoreCase);

// StringTokenizer splits without allocating an array
var header = new StringSegment("gzip, deflate, br");
var tokenizer = new StringTokenizer(header, new[] { ',', ' ' });

foreach (StringSegment token in tokenizer)
{
    if (!token.HasValue || token.Length == 0) continue;
    Console.WriteLine(token.Value); // "gzip", "deflate", "br"
}
```

## StringValues

`StringValues` represents zero, one, or many strings in a single struct, commonly used in HTTP headers and query strings.

```csharp
using Microsoft.Extensions.Primitives;

// Single value
StringValues single = "text/html";
Console.WriteLine(single.Count); // 1

// Multiple values
StringValues multiple = new StringValues(new[] { "gzip", "deflate", "br" });
Console.WriteLine(multiple.Count); // 3

// Concatenation
StringValues combined = StringValues.Concat(single, multiple);
Console.WriteLine(combined.Count); // 4

// Equality checks
bool hasGzip = StringValues.Equals(multiple, new StringValues("gzip"));

// Iteration
foreach (string? value in multiple)
{
    Console.WriteLine(value);
}
```

## Key Types at a Glance

| Type | Purpose | Common Usage |
|---|---|---|
| `IChangeToken` | Signal that a state change occurred | Configuration reload, file watching |
| `CancellationChangeToken` | Adapts CancellationToken to IChangeToken | Custom change providers |
| `CompositeChangeToken` | Merges multiple change tokens | Multi-source watching |
| `ChangeToken.OnChange` | Subscribes with auto-resubscription | Callback on configuration change |
| `StringSegment` | Zero-allocation string slice | Header parsing, URL processing |
| `StringTokenizer` | Allocation-free string splitting | CSV, header list parsing |
| `StringValues` | Multi-value string collection | HTTP headers, query parameters |

## Best Practices

1. Always dispose the `IDisposable` returned by `ChangeToken.OnChange` when the subscribing object is no longer needed to prevent memory leaks from dangling callbacks.
2. Keep change-token callbacks short and non-blocking; offload expensive work to a background task or channel rather than doing I/O inside the callback itself.
3. Use `CancellationChangeToken` with the swap-and-cancel pattern (via `Interlocked.Exchange`) to build re-usable change sources that can fire multiple times.
4. Prefer `StringSegment` over `string.Substring` in hot paths like header parsing or URL routing where avoiding heap allocations improves throughput.
5. Recreate tokens in the `changeTokenProducer` lambda passed to `ChangeToken.OnChange` rather than capturing a single token, because each token fires only once.
6. Use `CompositeChangeToken` to merge file-watcher and configuration-reload tokens when a component depends on both sources, avoiding separate subscription management.
7. Avoid storing references to `IChangeToken` instances beyond their useful lifetime; tokens are single-use and become inert after `HasChanged` returns `true`.
8. Use `StringValues.IsNullOrEmpty` to check for missing or empty header values instead of null-checking and length-checking separately.
9. When building a custom `ConfigurationProvider`, call `OnReload()` to fire the provider's change token rather than managing your own `CancellationTokenSource` externally.
10. Write unit tests for change-token producers by asserting `HasChanged` transitions from `false` to `true` and that registered callbacks execute exactly once per signal.
