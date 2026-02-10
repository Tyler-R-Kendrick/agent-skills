---
description: Guidance for Microsoft.Extensions.Primitives and change tokens.
metadata:
  displayName: Microsoft.Extensions.Primitives
---

# Microsoft.Extensions.Primitives

## Overview
Use `IChangeToken` and `ChangeToken` to react to configuration or file changes without polling.

## Example
```csharp
ChangeToken.OnChange(
	() => configuration.GetReloadToken(),
	() => logger.LogInformation("Configuration reloaded"));
```

## Guidance
- Use `IChangeToken` in options monitoring and file watchers.
- Keep callbacks short and resilient.
