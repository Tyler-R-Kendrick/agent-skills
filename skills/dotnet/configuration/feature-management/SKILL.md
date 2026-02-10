---
description: Guidance for Microsoft.FeatureManagement feature flag library.
metadata:
  displayName: Feature Management
---

# Feature Management

## Overview
Microsoft.FeatureManagement provides feature flag support for .NET applications with configuration-based toggles.

## Example
```csharp
// appsettings.json
{
  "FeatureManagement": {
    "NewCheckout": true,
    "BetaFeatures": {
      "EnabledFor": [
        { "Name": "Percentage", "Parameters": { "Value": 50 } }
      ]
    }
  }
}

// Code
services.AddFeatureManagement();

public class MyController : Controller
{
    private readonly IFeatureManager _featureManager;
    
    public async Task<IActionResult> Index()
    {
        if (await _featureManager.IsEnabledAsync("NewCheckout"))
        {
            return View("NewCheckout");
        }
        return View("OldCheckout");
    }
}
```

## Best Practices
- Use targeting for gradual rollouts
- Clean up old feature flags
- Test both enabled and disabled states
