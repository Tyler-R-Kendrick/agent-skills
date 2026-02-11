---
name: webapicontrib
description: Guidance for WebApiContrib extensions for ASP.NET Web API.
metadata:
  displayName: WebApiContrib
---

# WebApiContrib

## Overview
WebApiContrib provides additional formatters, filters, and utilities for ASP.NET Web API.

## Features
- CSV formatters
- MessagePack formatters
- BSON support
- Custom filters
- Utility methods

## Example
```csharp
// CSV formatter
config.Formatters.Add(new CsvMediaTypeFormatter());

// Custom content negotiation
app.UseWebApiContrib();
```

## Best Practices
- Use appropriate formatters
- Configure content negotiation
- Leverage contributed filters
- Extend as needed
