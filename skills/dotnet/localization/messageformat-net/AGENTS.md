# MessageFormat.NET

## Overview
MessageFormat.NET provides ICU MessageFormat support for advanced localization in .NET.

## Example
```csharp
using Jeffijoe.MessageFormat;

var mf = new MessageFormatter();

// Simple message
var message = mf.Format("Hello {name}!", new { name = "World" });

// Plurals
var plural = mf.Format(
    "{count, plural, one {# item} other {# items}}",
    new { count = 5 });

// Select
var gender = mf.Format(
    "{gender, select, male {He} female {She} other {They}} went home.",
    new { gender = "female" });
```

## Best Practices
- Use for complex pluralization
- Support multiple locales
- Externalize format strings
- Test with various inputs
