# Ocelot

## Overview
Ocelot is an API Gateway for .NET that provides routing, authentication, rate limiting, and more for microservices.

## Example
```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/users/{id}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        { "Host": "userservice", "Port": 80 }
      ],
      "UpstreamPathTemplate": "/users/{id}",
      "UpstreamHttpMethod": [ "Get" ]
    }
  ],
  "GlobalConfiguration": {
    "BaseUrl": "https://api.mysite.com"
  }
}
```

```csharp
builder.Services.AddOcelot();
app.UseOcelot().Wait();
```

## Features
- Request routing
- Load balancing
- Authentication/Authorization
- Rate limiting
- Caching
- Request aggregation

## Best Practices
- Use service discovery
- Implement rate limiting
- Enable caching where appropriate
- Monitor gateway health
