---
name: azure-ai-inference
description: Guidance for Azure.AI.Inference usage. Use when working with azure ai inference.
license: MIT
metadata:
  displayName: "Azure.AI.Inference"
  author: "Tyler-R-Kendrick"
---

# Azure.AI.Inference

## Overview
Use `Azure.AI.Inference` as the preferred Azure-hosted model SDK.

## Example
```csharp
// Create and inject an inference client at the composition root.
// Use the provider-specific client types from Azure.AI.Inference.
```

## Guidance
- Prefer `Azure.AI.Inference` over provider-specific SDKs when possible.
- Centralize endpoint, credentials, and deployment names in configuration.