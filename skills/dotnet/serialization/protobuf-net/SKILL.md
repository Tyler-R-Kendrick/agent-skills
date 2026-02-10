---
description: Guidance for protobuf-net Protocol Buffers serializer.
metadata:
  displayName: Protobuf.NET
---

# Protobuf.NET

## Overview
protobuf-net is a .NET implementation of Protocol Buffers, a language-neutral data serialization format.

## Example
```csharp
using ProtoBuf;

[ProtoContract]
public class User
{
    [ProtoMember(1)]
    public int Id { get; set; }
    
    [ProtoMember(2)]
    public string Name { get; set; }
    
    [ProtoMember(3)]
    public List<string> Roles { get; set; }
}

// Serialize
using var ms = new MemoryStream();
Serializer.Serialize(ms, user);
var bytes = ms.ToArray();

// Deserialize
using var readMs = new MemoryStream(bytes);
var user = Serializer.Deserialize<User>(readMs);
```

## Best Practices
- Use ProtoContract attributes
- Version your schemas
- Use appropriate field numbers
- Consider backwards compatibility
- Benchmark against alternatives
