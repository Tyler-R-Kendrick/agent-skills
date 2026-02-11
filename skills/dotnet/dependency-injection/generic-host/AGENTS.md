# Generic Host

## Overview
Use `Host.CreateApplicationBuilder` to standardize DI, config, logging, and lifetimes.

## Example
```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();

using var host = builder.Build();
await host.RunAsync();
```

## Guidance
- Prefer top-level statements in `Program.cs`.
- Keep registration and configuration in extension methods.