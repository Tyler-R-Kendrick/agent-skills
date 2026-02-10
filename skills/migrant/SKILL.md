---
description: Guidance for Migrant fast binary serialization library.
metadata:
  displayName: Migrant
---

# Migrant

## Overview
Migrant is a fast and flexible serialization framework for .NET with support for version tolerant deserialization.

## Example
```csharp
using Migrant;

var serializer = new Serializer();

// Serialize
using var stream = new MemoryStream();
serializer.Serialize(obj, stream);

// Deserialize
stream.Position = 0;
var result = serializer.Deserialize<MyClass>(stream);

// With settings
var settings = new Settings(
    supportForISerializable: true,
    useBuffering: true);
var customSerializer = new Serializer(settings);
```

## Best Practices
- Use for internal serialization
- Configure appropriate settings
- Test version compatibility
- Handle circular references
