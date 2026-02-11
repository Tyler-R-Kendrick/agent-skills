---
name: dotnet-web-apps
description: Guidance for building .NET web applications.
metadata:
  displayName: .NET Web Apps
---

# .NET Web Apps

## Overview
Patterns and best practices for building web applications with ASP.NET Core.

## Application Types
- **MVC**: Model-View-Controller pattern
- **Razor Pages**: Page-based model
- **Blazor**: Interactive web UI with C#
- **Web API**: RESTful services

## Example (Minimal API)
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/products", async (IProductService service) =>
    await service.GetAllAsync());

app.MapPost("/api/products", async (Product product, IProductService service) =>
{
    await service.CreateAsync(product);
    return Results.Created($"/api/products/{product.Id}", product);
});

app.Run();
```

## Best Practices
- Use dependency injection
- Implement proper error handling
- Configure CORS appropriately
- Use authentication and authorization
- Enable response compression
- Implement rate limiting
