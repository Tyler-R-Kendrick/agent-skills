---
description: Guidance for fluent API serialization patterns in .NET.
metadata:
  displayName: Fluent Serializer
---

# Fluent Serializer

## Overview
Patterns for building fluent APIs for serialization configuration in .NET.

## Example
```csharp
public class FluentSerializer<T>
{
    private readonly List<Action<T, JsonSerializerOptions>> _config = new();
    
    public FluentSerializer<T> IgnoreNulls()
    {
        _config.Add((_, opts) => opts.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull);
        return this;
    }
    
    public FluentSerializer<T> Indent()
    {
        _config.Add((_, opts) => opts.WriteIndented = true);
        return this;
    }
    
    public string Serialize(T obj)
    {
        var options = new JsonSerializerOptions();
        foreach (var config in _config)
            config(obj, options);
        return JsonSerializer.Serialize(obj, options);
    }
}

// Usage
var json = new FluentSerializer<User>()
    .IgnoreNulls()
    .Indent()
    .Serialize(user);
```

## Best Practices
- Chain configuration methods
- Provide sensible defaults
- Make API discoverable
- Support common scenarios
