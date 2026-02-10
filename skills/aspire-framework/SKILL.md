---
name: aspire-framework
description: Guidance for using .NET Aspire for building cloud-native, distributed applications. Use when working with .NET Aspire.
license: MIT
metadata:
  displayName: "Aspire Framework"
  author: "Tyler-R-Kendrick"
---

# .NET Aspire

## Overview
.NET Aspire is an opinionated framework for building observable, production-ready cloud-native applications with .NET. It provides orchestration, service discovery, and integrated developer experience.

## Installation

```bash
dotnet workload install aspire
dotnet new aspire-starter -n MyAspireApp
```

## Project Structure

An Aspire solution typically contains:
- **AppHost**: Orchestration project that defines resources and dependencies
- **ServiceDefaults**: Shared configuration for observability and resilience
- **Web/API Projects**: Your actual application services

## App Host (Orchestration)

Define and configure distributed application resources.

```csharp
var builder = DistributedApplication.CreateBuilder(args);

// Add Redis cache
var cache = builder.AddRedis("cache");

// Add PostgreSQL database
var postgres = builder.AddPostgres("postgres")
    .WithPgAdmin();

var catalogDb = postgres.AddDatabase("catalogdb");

// Add API service
var catalogApi = builder.AddProject<Projects.CatalogApi>("catalogapi")
    .WithReference(cache)
    .WithReference(catalogDb);

// Add frontend
builder.AddProject<Projects.WebFrontend>("webfrontend")
    .WithReference(catalogApi)
    .WithReference(cache);

builder.Build().Run();
```

## Service Defaults

Configure telemetry, health checks, and resilience.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public static class Extensions
{
    public static IHostApplicationBuilder AddServiceDefaults(this IHostApplicationBuilder builder)
    {
        builder.ConfigureOpenTelemetry();
        builder.AddDefaultHealthChecks();
        builder.Services.AddServiceDiscovery();
        
        builder.Services.ConfigureHttpClientDefaults(http =>
        {
            http.AddStandardResilienceHandler();
            http.AddServiceDiscovery();
        });
        
        return builder;
    }
}
```

## Service Discovery

Automatic service-to-service communication.

```csharp
// In AppHost
var catalogApi = builder.AddProject<Projects.CatalogApi>("catalogapi");

builder.AddProject<Projects.WebFrontend>("webfrontend")
    .WithReference(catalogApi); // Injects service endpoint

// In consuming service
public class ProductService
{
    private readonly HttpClient _httpClient;
    
    public ProductService(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }
    
    public async Task<Product[]> GetProductsAsync()
    {
        // Service discovery resolves "catalogapi" to actual endpoint
        return await _httpClient.GetFromJsonAsync<Product[]>("http://catalogapi/products");
    }
}
```

## Adding Containers

```csharp
var builder = DistributedApplication.CreateBuilder(args);

// Redis
var redis = builder.AddRedis("redis");

// PostgreSQL
var postgres = builder.AddPostgres("postgres");

// RabbitMQ
var rabbitmq = builder.AddRabbitMQ("messaging");

// MongoDB
var mongo = builder.AddMongoDB("mongo")
    .WithMongoExpress();

// SQL Server
var sql = builder.AddSqlServer("sql");
```

## Adding Databases

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");

// Add specific databases
var orderDb = postgres.AddDatabase("orderdb");
var catalogDb = postgres.AddDatabase("catalogdb");

// Use in services
var orderService = builder.AddProject<Projects.OrderService>("orderservice")
    .WithReference(orderDb);
```

## Environment Variables

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.Api>("api")
    .WithEnvironment("FEATURE_FLAG", "true")
    .WithEnvironment("LOG_LEVEL", "Debug");
```

## External HTTP Endpoints

```csharp
var builder = DistributedApplication.CreateBuilder(args);

// Add external API endpoint
var weatherApi = builder.AddConnectionString("weatherapi", "https://api.weather.com");

var frontend = builder.AddProject<Projects.Frontend>("frontend")
    .WithReference(weatherApi);
```

## Replicas (Scaling)

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.Api>("api")
    .WithReplicas(3); // Run 3 instances
```

## Health Checks

```csharp
// In service
public static class Extensions
{
    public static IHostApplicationBuilder AddDefaultHealthChecks(this IHostApplicationBuilder builder)
    {
        builder.Services.AddHealthChecks()
            .AddCheck("self", () => HealthCheckResult.Healthy());
        
        return builder;
    }
}

// In Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();

var app = builder.Build();
app.MapDefaultEndpoints(); // Adds /health, /alive endpoints
app.Run();
```

## OpenTelemetry

Automatic distributed tracing and metrics.

```csharp
public static class Extensions
{
    public static IHostApplicationBuilder ConfigureOpenTelemetry(this IHostApplicationBuilder builder)
    {
        builder.Services.AddOpenTelemetry()
            .WithMetrics(metrics =>
            {
                metrics.AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddRuntimeInstrumentation();
            })
            .WithTracing(tracing =>
            {
                tracing.AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation();
            });
        
        builder.AddOpenTelemetryExporters();
        
        return builder;
    }
}
```

## Custom Resources

```csharp
// Define custom resource
public class CustomResource : ContainerResource
{
    public CustomResource(string name) : base(name)
    {
    }
}

// Extension method
public static class CustomResourceExtensions
{
    public static IResourceBuilder<CustomResource> AddCustomResource(
        this IDistributedApplicationBuilder builder,
        string name)
    {
        var resource = new CustomResource(name);
        return builder.AddResource(resource)
            .WithImage("custom/image")
            .WithImageTag("latest");
    }
}

// Usage
var builder = DistributedApplication.CreateBuilder(args);
var custom = builder.AddCustomResource("myresource");
```

## Secrets

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.Api>("api")
    .WithEnvironment("ApiKey", builder.Configuration["ApiKey"]!);
```

## Volumes

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume(); // Persist data

var redis = builder.AddRedis("redis")
    .WithDataVolume();
```

## Networking

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.Api>("api")
    .WithHttpEndpoint(port: 5001, targetPort: 8080)
    .WithHttpsEndpoint(port: 5002);
```

## Dashboard

Aspire provides a built-in dashboard for observability.

Access at: `http://localhost:15888` (default)

Features:
- Live logs from all services
- Distributed traces
- Metrics visualization
- Resource status
- Environment variables

## Testing

```csharp
using Aspire.Hosting.Testing;

public class AppHostTests
{
    [Fact]
    public async Task GetWebResourceRootReturnsOk()
    {
        var appHost = await DistributedApplicationTestingBuilder
            .CreateAsync<Projects.AppHost>();
        
        await using var app = await appHost.BuildAsync();
        await app.StartAsync();
        
        var httpClient = app.CreateHttpClient("webfrontend");
        var response = await httpClient.GetAsync("/");
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
```

## Practical Example

```csharp
// AppHost/Program.cs
var builder = DistributedApplication.CreateBuilder(args);

// Infrastructure
var redis = builder.AddRedis("redis")
    .WithRedisCommander();

var postgres = builder.AddPostgres("postgres")
    .WithPgAdmin();

var catalogDb = postgres.AddDatabase("catalogdb");
var orderDb = postgres.AddDatabase("orderdb");

var rabbitmq = builder.AddRabbitMQ("messaging")
    .WithManagementPlugin();

// Backend services
var catalogApi = builder.AddProject<Projects.CatalogApi>("catalogapi")
    .WithReference(catalogDb)
    .WithReference(redis);

var orderApi = builder.AddProject<Projects.OrderApi>("orderapi")
    .WithReference(orderDb)
    .WithReference(rabbitmq);

var orderProcessor = builder.AddProject<Projects.OrderProcessor>("orderprocessor")
    .WithReference(orderDb)
    .WithReference(rabbitmq);

// Frontend
var webApp = builder.AddProject<Projects.WebApp>("webapp")
    .WithReference(catalogApi)
    .WithReference(orderApi)
    .WithReference(redis);

builder.Build().Run();
```

## Guidance

- Use Aspire for cloud-native, distributed .NET applications.
- Define all resources and dependencies in AppHost project.
- Use ServiceDefaults for consistent observability across services.
- Leverage service discovery instead of hardcoding URLs.
- Use the Aspire dashboard during development for debugging.
- Add health checks to all services.
- Use WithDataVolume() for stateful containers in development.
- Configure OpenTelemetry for production monitoring.
- Use replicas for horizontal scaling in production.
- Prefer Aspire components (AddRedis, AddPostgres) over manual container configuration.
- Use environment variables for feature flags and configuration.
- Test orchestration with DistributedApplicationTestingBuilder.
- Deploy to Azure Container Apps or Kubernetes for production.
