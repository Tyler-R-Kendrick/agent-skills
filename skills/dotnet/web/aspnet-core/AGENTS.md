# ASP.NET Core

## Overview
Use ASP.NET Core for web apps and APIs with minimal hosting and DI.

## Example
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
app.MapGet("/health", () => Results.Ok());
app.Run();
```

## Guidance
- Prefer minimal APIs for lightweight services.
- Keep hosting configuration in `Program.cs` and registration extensions.