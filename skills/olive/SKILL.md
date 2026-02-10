---
description: Guidance for Olive library (likely referring to a specific .NET library).
metadata:
  displayName: Olive
---

# Olive

## Overview
Olive is a productivity framework for .NET that provides extensions and utilities for common development tasks.

## Example
```csharp
using Olive;

// String extensions
var cleaned = dirtyString.OrEmpty().TrimOrNull();
var safe = input.ToSafeFileName();

// Collection extensions
var first = items.FirstOrDefault().OrDefault(() => new Item());

// Validation
if (email.IsValidEmail())
{
    // Process email
}

// Date extensions
var formatted = date.ToShortDateString();
var relative = date.ToNaturalTime(); // "2 days ago"
```

## Best Practices
- Use extension methods for cleaner code
- Leverage utility functions
- Follow framework conventions
- Handle nulls gracefully
