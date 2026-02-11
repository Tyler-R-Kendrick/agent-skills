---
name: aspnet-core
description: |
  USE FOR: Building web APIs, web applications, and microservices with ASP.NET Core. Use for minimal APIs, controller-based APIs, Razor Pages, MVC, gRPC, and real-time applications with the full ASP.NET Core middleware pipeline, dependency injection, and configuration system.
  DO NOT USE FOR: Desktop or mobile UI (use MAUI, WPF, or Avalonia), game development (use Unity or MonoGame), or standalone console tools that do not serve HTTP traffic.
license: MIT
metadata:
  displayName: ASP.NET Core
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# ASP.NET Core

## Overview

ASP.NET Core is Microsoft's cross-platform, high-performance web framework for building modern web APIs, web applications, and microservices. It runs on .NET 6+ and supports minimal APIs (lightweight endpoints), controller-based APIs, Razor Pages, MVC, Blazor, gRPC, and SignalR. ASP.NET Core uses a middleware pipeline for request processing, built-in dependency injection, configuration from multiple sources (JSON, environment variables, Azure Key Vault), and OpenAPI/Swagger integration for API documentation.

## Minimal API Setup

Build lightweight HTTP APIs with minimal ceremony using the minimal API pattern.

```csharp
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddProblemDetails();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseExceptionHandler();

var products = app.MapGroup("/api/products")
    .WithTags("Products")
    .WithOpenApi();

products.MapGet("/", async (IProductRepository repo) =>
    TypedResults.Ok(await repo.GetAllAsync()));

products.MapGet("/{id:int}", async Task<Results<Ok<Product>, NotFound>> (
    int id, IProductRepository repo) =>
{
    var product = await repo.GetByIdAsync(id);
    return product is not null
        ? TypedResults.Ok(product)
        : TypedResults.NotFound();
});

products.MapPost("/", async Task<Created<Product>> (
    CreateProductRequest request,
    IProductRepository repo) =>
{
    var product = new Product
    {
        Name = request.Name,
        Price = request.Price,
        Category = request.Category
    };
    await repo.AddAsync(product);
    return TypedResults.Created($"/api/products/{product.Id}", product);
}).WithValidationFilter();

products.MapDelete("/{id:int}", async Task<Results<NoContent, NotFound>> (
    int id, IProductRepository repo) =>
{
    var deleted = await repo.DeleteAsync(id);
    return deleted ? TypedResults.NoContent() : TypedResults.NotFound();
});

app.Run();

public record CreateProductRequest(string Name, decimal Price, string Category);
```

## Middleware Pipeline

Configure cross-cutting concerns using the middleware pipeline.

```csharp
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("api", config =>
    {
        config.PermitLimit = 100;
        config.Window = TimeSpan.FromMinutes(1);
        config.QueueLimit = 10;
    });
});
builder.Services.AddResponseCompression();
builder.Services.AddOutputCache();
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();

var app = builder.Build();

// Middleware order matters
app.UseExceptionHandler("/error");
app.UseResponseCompression();
app.UseHttpsRedirection();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseOutputCache();

app.MapHealthChecks("/health");

// Custom middleware
app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();
    context.Response.OnStarting(() =>
    {
        context.Response.Headers["X-Response-Time"] = $"{stopwatch.ElapsedMilliseconds}ms";
        return Task.CompletedTask;
    });
    await next(context);
});

app.Run();
```

## Dependency Injection and Service Lifetime

Register services with the correct lifetime to avoid captive dependency and threading issues.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Singleton: shared across all requests (thread-safe required)
builder.Services.AddSingleton<ICacheService, RedisCacheService>();

// Scoped: one instance per HTTP request
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Transient: new instance every time
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

// Named HttpClient with resilience
builder.Services.AddHttpClient<IExternalApiClient, ExternalApiClient>(client =>
{
    client.BaseAddress = new Uri("https://api.external.com/");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
})
.AddStandardResilienceHandler();

// Options pattern
builder.Services.Configure<SmtpOptions>(
    builder.Configuration.GetSection("Smtp"));

var app = builder.Build();
```

## Error Handling and Problem Details

Return consistent error responses using the RFC 7807 Problem Details standard.

```csharp
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Extensions["traceId"] =
            Activity.Current?.Id ?? context.HttpContext.TraceIdentifier;
    };
});

var app = builder.Build();

app.UseExceptionHandler(exceptionApp =>
{
    exceptionApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        var problemDetails = exception switch
        {
            NotFoundException e => new ProblemDetails
            {
                Status = 404,
                Title = "Resource not found",
                Detail = e.Message
            },
            ValidationException e => new ProblemDetails
            {
                Status = 400,
                Title = "Validation failed",
                Detail = e.Message
            },
            _ => new ProblemDetails
            {
                Status = 500,
                Title = "An unexpected error occurred"
            }
        };

        context.Response.StatusCode = problemDetails.Status ?? 500;
        await context.Response.WriteAsJsonAsync(problemDetails);
    });
});
```

## ASP.NET Core Application Models

| Feature | Minimal APIs | Controllers | Razor Pages | Blazor |
|---|---|---|---|---|
| Use case | Microservices, simple APIs | Full-featured APIs | Server-rendered pages | Interactive web UI |
| Routing | Lambda-based | Attribute/conventional | Page-based | Component-based |
| Model binding | Parameter injection | `[FromBody]`, `[FromQuery]` | `[BindProperty]` | `@bind` |
| Filters | Endpoint filters | Action filters | Page filters | N/A |
| OpenAPI | Built-in | Swashbuckle/NSwag | N/A | N/A |
| Overhead | Minimal | Moderate | Moderate | Higher |

## Best Practices

1. **Use `TypedResults` return types (e.g., `Task<Results<Ok<T>, NotFound>>`) on minimal API endpoints** instead of returning `IResult` so that the OpenAPI generator infers response schemas and status codes automatically, producing accurate Swagger documentation without manual `[ProducesResponseType]` attributes.

2. **Register `DbContext` as `Scoped` (the default for `AddDbContext`) and never inject it into `Singleton` services** because `DbContext` is not thread-safe; injecting a scoped service into a singleton creates a captive dependency that shares a single `DbContext` across concurrent requests, causing data corruption.

3. **Order middleware in the pipeline according to the official ASP.NET Core documentation** (ExceptionHandler, HSTS, HttpsRedirection, StaticFiles, Routing, CORS, Authentication, Authorization, custom middleware, endpoints), because middleware executes in registration order and misordering causes authentication to be skipped or CORS headers to be missing.

4. **Use the `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` pattern for configuration** instead of reading `IConfiguration` directly in services, because the Options pattern provides strong typing, validation via `ValidateOnStart()`, and hot-reload support for configuration changes without restarting the application.

5. **Configure `AddProblemDetails()` and `UseExceptionHandler()` to return RFC 7807 problem details for all error responses** instead of returning raw exception messages or custom error shapes, so that API clients can parse errors consistently using a standard format across all endpoints.

6. **Use `AddHttpClient<T>()` with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`** instead of creating `HttpClient` instances manually, because the factory manages `HttpMessageHandler` lifetimes (preventing socket exhaustion) and the resilience handler adds retry, circuit breaker, and timeout policies.

7. **Apply rate limiting using `AddRateLimiter()` with named policies** (e.g., `"api"`, `"auth"`) and assign them to endpoint groups via `.RequireRateLimiting("api")`, rather than implementing custom rate-limiting middleware, so that limits are configurable per-route and testable via the built-in rate-limiting infrastructure.

8. **Use `MapGroup()` to organize related endpoints under a shared prefix, tag, and filter set** instead of repeating `.WithTags()`, `.RequireAuthorization()`, and route prefixes on every endpoint, reducing duplication and ensuring that new endpoints in the group inherit the correct policies.

9. **Register health checks using `AddHealthChecks().AddDbContextCheck<T>()` and `.AddCheck<CustomCheck>()`** and expose them at `/health` with `MapHealthChecks`, so that orchestrators (Kubernetes, Azure App Service) can probe application readiness and liveness without hitting business endpoints.

10. **Set `builder.Configuration.GetConnectionString()` values from environment variables or Azure Key Vault in production** rather than hardcoding them in `appsettings.json`, and use `builder.Configuration.AddUserSecrets<Program>()` for local development, ensuring secrets never appear in source control.
