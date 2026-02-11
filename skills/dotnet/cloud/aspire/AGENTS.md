# .NET Aspire

## Overview
.NET Aspire is an opinionated framework for building cloud-native, distributed applications with built-in observability and service discovery.

## Example
```csharp
var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");
var db = builder.AddPostgres("postgres");

builder.AddProject<Projects.WebApp>("webapp")
    .WithReference(cache)
    .WithReference(db);

builder.Build().Run();
```

## Components
- Service discovery
- Telemetry and observability
- Health checks
- Resilience patterns
- Configuration management

## Best Practices
- Use Aspire for microservices architectures
- Leverage built-in service discovery
- Configure health checks
- Use telemetry for monitoring
- Organize services in app host project
