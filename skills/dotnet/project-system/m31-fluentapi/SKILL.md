---
description: Guidance for M31.FluentAPI fluent API source generator.
metadata:
  displayName: M31.FluentAPI
---

# M31.FluentAPI

## Overview
M31.FluentAPI is a source generator that creates fluent builder APIs from your classes.

## Example
```csharp
using M31.FluentApi.Attributes;

[FluentApi]
public class User
{
    public string Name { get; init; }
    public int Age { get; init; }
    public string Email { get; init; }
}

// Generated usage
var user = User.Builder()
    .WithName("Alice")
    .WithAge(30)
    .WithEmail("alice@example.com")
    .Build();
```

## Best Practices
- Use for builder pattern
- Configure generation options
- Review generated code
- Test fluent API
