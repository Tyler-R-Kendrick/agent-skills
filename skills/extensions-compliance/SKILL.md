---
name: extensions-compliance
description: Guidance for Microsoft.Extensions.Compliance. Use when working with extensions compliance.
license: MIT
metadata:
  displayName: "Compliance"
  author: "Tyler-R-Kendrick"
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