---
description: Guidance for OpenFeature feature flag SDK.
metadata:
  displayName: OpenFeature
---

# OpenFeature

## Overview
OpenFeature is a standard for feature flag management, providing a vendor-neutral API for feature toggles.

## Example
```csharp
using OpenFeature;

var client = Api.Instance.GetClient();

// Boolean flag
bool showNewFeature = await client.GetBooleanValueAsync(
    "new-feature", 
    false,
    context);

// String flag with targeting
var theme = await client.GetStringValueAsync(
    "theme",
    "default",
    new EvaluationContext("user-123"));
```

## Use Cases
- Feature toggles
- A/B testing
- Gradual rollouts
- Kill switches
- Configuration management

## Best Practices
- Use descriptive flag names
- Set appropriate defaults
- Clean up old flags
- Use targeting for rollouts
- Monitor flag usage
