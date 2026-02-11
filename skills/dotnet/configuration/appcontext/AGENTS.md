# AppContext

## Overview
Use `AppContext` switches to toggle runtime behavior and compatibility options.

## Example
```csharp
if (AppContext.TryGetSwitch("MyApp.DisableLegacyBehavior", out var disabled) && disabled)
{
	// Legacy behavior is disabled.
}
```

## Guidance
- Document switch names and defaults.
- Use switches for compatibility, not user-facing feature flags.