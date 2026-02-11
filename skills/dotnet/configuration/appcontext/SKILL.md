---
name: appcontext
description: >
  USE FOR: Toggling runtime compatibility switches, enabling or disabling breaking-change mitigations
  between framework versions, gating legacy code paths at startup, and reading platform-level
  feature switches. DO NOT USE FOR: User-facing feature flags (use Microsoft.FeatureManagement or
  OpenFeature), per-request dynamic toggles, or configuration that changes at runtime without restart.
license: MIT
metadata:
  displayName: "AppContext"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# AppContext

## Overview

`System.AppContext` provides a lightweight mechanism for setting and querying boolean switches that control runtime behavior across an application. It is built into the .NET base class library and requires no additional packages. The primary use case is framework compatibility: when a new .NET version introduces a breaking change, the runtime exposes an `AppContext` switch so that applications can opt in or opt out of the new behavior. Library authors can also define their own switches to let consumers toggle behaviors without recompiling.

Switches are static, process-wide, and typically set once at startup. They are not designed for dynamic feature flagging or per-user targeting. Values can be set in code, in the `.runtimeconfig.json` file, or via MSBuild properties that flow into that file at build time.

## Setting Switches in Code

The simplest approach is to call `AppContext.SetSwitch` early in the application's entry point before any code reads the switch.

```csharp
using System;

public static class Program
{
    public static void Main(string[] args)
    {
        // Opt out of a breaking change introduced in a newer runtime
        AppContext.SetSwitch("Switch.System.Net.DontEnableSchSendAuxRecord", true);

        // Define a custom switch for your library
        AppContext.SetSwitch("MyCompany.MyLib.UseLegacySerialization", false);

        var host = CreateHostBuilder(args).Build();
        host.Run();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
}
```

## Reading Switches

Use `AppContext.TryGetSwitch` to read a switch value. It returns `false` if the switch has never been set, and outputs the switch value through the `out` parameter.

```csharp
using System;

public sealed class SerializationService
{
    private readonly bool _useLegacyFormat;

    public SerializationService()
    {
        _useLegacyFormat = AppContext.TryGetSwitch(
            "MyCompany.MyLib.UseLegacySerialization", out bool enabled) && enabled;
    }

    public byte[] Serialize<T>(T value)
    {
        if (_useLegacyFormat)
        {
            return LegacySerializer.Serialize(value);
        }
        return ModernSerializer.Serialize(value);
    }
}
```

## Setting Switches via runtimeconfig.json

For deployment scenarios where you cannot change source code, switches can be declared in the `runtimeconfig.json` file that ships alongside the application binary.

```json
{
  "runtimeOptions": {
    "configProperties": {
      "Switch.System.Net.DontEnableSchSendAuxRecord": true,
      "MyCompany.MyLib.UseLegacySerialization": false,
      "System.Globalization.Invariant": true
    }
  }
}
```

## Setting Switches via MSBuild

You can also flow switch values from your `.csproj` file so they end up in `runtimeconfig.json` automatically.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="MyCompany.MyLib.UseLegacySerialization"
                                    Value="false"
                                    Trim="true" />
  </ItemGroup>
</Project>
```

## Library Author Pattern

When authoring a library, define switch names as constants and document them for consumers.

```csharp
using System;

namespace MyCompany.MyLib
{
    public static class LibrarySwitches
    {
        /// <summary>
        /// When enabled, the library uses the legacy XML serialization format
        /// instead of the newer JSON-based format introduced in v3.0.
        /// Default: false (JSON format is used).
        /// </summary>
        public const string UseLegacySerialization = "MyCompany.MyLib.UseLegacySerialization";

        /// <summary>
        /// When enabled, connection pooling is disabled. Useful for debugging
        /// connection leaks but should not be used in production.
        /// Default: false (pooling is enabled).
        /// </summary>
        public const string DisableConnectionPooling = "MyCompany.MyLib.DisableConnectionPooling";

        public static bool IsLegacySerializationEnabled()
        {
            return AppContext.TryGetSwitch(UseLegacySerialization, out bool enabled) && enabled;
        }

        public static bool IsConnectionPoolingDisabled()
        {
            return AppContext.TryGetSwitch(DisableConnectionPooling, out bool enabled) && enabled;
        }
    }
}
```

## AppContext vs Other Approaches

| Aspect | AppContext Switches | IConfiguration | Feature Management |
|---|---|---|---|
| Granularity | Process-wide boolean | Arbitrary key-value | Per-user, percentage, time-window |
| Mutability | Set once, read many | Supports reload | Dynamic evaluation per request |
| Configuration source | Code, runtimeconfig.json | JSON, env vars, secrets | Configuration + filters |
| Primary use case | Runtime compatibility | App settings | Feature flags and A/B testing |
| Package required | None (BCL) | Microsoft.Extensions.Configuration | Microsoft.FeatureManagement |

## Best Practices

1. Use a reverse-domain naming convention for custom switches (e.g., `MyCompany.MyLib.SwitchName`) to avoid collisions with framework or third-party switches.
2. Set all switches as early as possible in `Main` or `Program.cs` before any dependent code executes, because reads may be cached by the consuming component.
3. Always provide a safe default when a switch is unset by treating `TryGetSwitch` returning `false` as the default behavior path.
4. Document every custom switch with its name, default value, and the behavioral change it controls so that consumers can discover it without reading source code.
5. Expose switch names as `public const string` fields in a dedicated static class rather than scattering magic strings throughout the codebase.
6. Reserve `AppContext` switches for binary compatibility decisions; do not use them for user-facing feature flags, A/B testing, or configuration that varies per environment.
7. Prefer `runtimeconfig.json` or MSBuild `RuntimeHostConfigurationOption` over `SetSwitch` in code when the switch needs to be controlled by operations teams without recompilation.
8. Write unit tests that exercise both switch states by calling `AppContext.SetSwitch` in test setup and verifying the two code paths produce correct results.
9. Avoid reading a switch value on every method call in a hot path; instead, read it once during construction and store the result in a field.
10. Review switches set by the .NET runtime itself when upgrading target frameworks, as new switches may be introduced that affect networking, globalization, or serialization behavior.
