---
description: Guidance for Hyperion polymorphic serialization library.
metadata:
  displayName: Hyperion
---

# Hyperion

## Overview
Hyperion is a high-performance polymorphic serializer for .NET, designed for use with Akka.NET.

## Example
```csharp
using Hyperion;

var serializer = new Serializer(new SerializerOptions(
    preserveObjectReferences: true,
    versionTolerance: true));

// Serialize
using var stream = new MemoryStream();
serializer.Serialize(obj, stream);

// Deserialize
stream.Position = 0;
var deserialized = serializer.Deserialize<MyClass>(stream);
```

## Best Practices
- Use for actor messages
- Enable version tolerance
- Handle polymorphic types
- Consider serialization performance
- Test with different types
