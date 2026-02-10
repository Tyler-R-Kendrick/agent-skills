---
description: Guidance for YARP (Yet Another Reverse Proxy).
metadata:
  displayName: YARP
---

# YARP

## Overview
YARP is a highly customizable reverse proxy library from Microsoft for building API gateways and load balancers.

## Example
```json
{
  "ReverseProxy": {
    "Routes": {
      "route1": {
        "ClusterId": "cluster1",
        "Match": {
          "Path": "/api/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "cluster1": {
        "Destinations": {
          "destination1": {
            "Address": "https://backend1.com/"
          }
        }
      }
    }
  }
}
```

```csharp
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
    
app.MapReverseProxy();
```

## Best Practices
- Use health checks
- Implement circuit breakers
- Configure timeout policies
- Add custom middleware
- Monitor proxy metrics
