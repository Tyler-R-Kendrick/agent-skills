---
description: Guidance for Microsoft.Extensions.Compliance.
metadata:
  displayName: Compliance
---

# Compliance

## Overview
Use compliance extensions for data classification and policy enforcement.

## Example
```csharp
builder.Services.AddCompliance();
```

## Guidance
- Classify sensitive data at boundaries.
- Ensure logging and telemetry respect compliance policies.
