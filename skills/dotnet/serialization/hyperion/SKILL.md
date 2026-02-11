---
name: hyperion
description: >
  Guidance for Hyperion high-performance polymorphic serializer for .NET.
  USE FOR: Akka.NET actor message serialization, polymorphic type handling, object graph serialization
  with circular references, high-throughput binary serialization, version-tolerant deserialization
  of actor system messages.
  DO NOT USE FOR: human-readable serialization (use System.Text.Json), cross-language interop
  (use protobuf-net or Bond), REST API payloads, or long-term data storage requiring schema evolution.
license: MIT
metadata:
  displayName: "Hyperion"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Hyperion

## Overview

Hyperion (formerly Wire) is a high-performance, polymorphic binary serializer for .NET, originally designed as the default serializer for Akka.NET. It excels at serializing complex object graphs including polymorphic types, circular references, and anonymous types without requiring explicit schema annotations. Hyperion preserves type identity across serialization boundaries, making it ideal for actor message passing where the exact runtime type must survive a round-trip. It supports version tolerance, allowing fields to be added to types without breaking deserialization of previously serialized data.

## Basic Serialization

Create a Hyperion serializer and serialize/deserialize objects to binary streams.

```csharp
using Hyperion;
using System.IO;

var serializer = new Serializer();

// Define a message type
public record OrderPlaced(
    Guid OrderId,
    string CustomerId,
    decimal Amount,
    DateTimeOffset PlacedAt);

// Serialize
var message = new OrderPlaced(
    Guid.NewGuid(), "cust-123", 99.99m, DateTimeOffset.UtcNow);

using var stream = new MemoryStream();
serializer.Serialize(message, stream);
byte[] bytes = stream.ToArray();

// Deserialize
using var readStream = new MemoryStream(bytes);
var deserialized = serializer.Deserialize<OrderPlaced>(readStream);
```

## Serializer Options

Configure Hyperion with options for version tolerance, object references, and known types.

```csharp
using Hyperion;

var serializer = new Serializer(new SerializerOptions(
    // Preserve object identity for circular references
    preserveObjectReferences: true,
    // Allow adding fields to types without breaking deserialization
    versionTolerance: true,
    // Pre-register known types for smaller payloads
    knownTypes: new[]
    {
        typeof(OrderPlaced),
        typeof(OrderShipped),
        typeof(OrderCancelled),
        typeof(Address)
    },
    // Ignore types missing during deserialization
    ignoreISerializable: true
));

// With these options, serialization handles:
// - Circular references between objects
// - Types that have new fields added since serialization
// - Pre-registered types use less space on the wire
```

## Polymorphic Type Handling

Hyperion automatically preserves runtime type information for polymorphic scenarios.

```csharp
using Hyperion;
using System.IO;

public abstract class DomainEvent
{
    public Guid EventId { get; init; } = Guid.NewGuid();
    public DateTimeOffset Timestamp { get; init; } = DateTimeOffset.UtcNow;
}

public class UserRegistered : DomainEvent
{
    public string UserId { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
}

public class UserDeactivated : DomainEvent
{
    public string UserId { get; init; } = string.Empty;
    public string Reason { get; init; } = string.Empty;
}

var serializer = new Serializer(new SerializerOptions(
    preserveObjectReferences: true,
    versionTolerance: true));

// Serialize as base type
DomainEvent evt = new UserRegistered
{
    UserId = "user-456",
    Email = "user@example.com"
};

using var stream = new MemoryStream();
serializer.Serialize(evt, stream);

// Deserialize preserves the concrete type
stream.Position = 0;
var restored = serializer.Deserialize<DomainEvent>(stream);
// restored is UserRegistered, not just DomainEvent

bool isRegistered = restored is UserRegistered;
// isRegistered == true
```

## Circular Reference Handling

Hyperion can serialize object graphs with circular references when `preserveObjectReferences` is enabled.

```csharp
using Hyperion;
using System.IO;

public class TreeNode
{
    public string Name { get; set; } = string.Empty;
    public TreeNode? Parent { get; set; }
    public List<TreeNode> Children { get; set; } = new();
}

var serializer = new Serializer(new SerializerOptions(
    preserveObjectReferences: true));

// Build a tree with parent back-references
var root = new TreeNode { Name = "Root" };
var child1 = new TreeNode { Name = "Child1", Parent = root };
var child2 = new TreeNode { Name = "Child2", Parent = root };
root.Children.Add(child1);
root.Children.Add(child2);

// Serialize without stack overflow
using var stream = new MemoryStream();
serializer.Serialize(root, stream);

// Deserialize preserves the circular references
stream.Position = 0;
var restored = serializer.Deserialize<TreeNode>(stream);
// restored.Children[0].Parent == restored (same reference)
```

## Akka.NET Integration

Configure Hyperion as the serializer for Akka.NET actor messages.

```csharp
using Akka.Actor;
using Akka.Configuration;

// akka.conf or HOCON configuration
var config = ConfigurationFactory.ParseString(@"
    akka {
        actor {
            serializers {
                hyperion = ""Akka.Serialization.HyperionSerializer, Akka.Serialization.Hyperion""
            }
            serialization-bindings {
                ""System.Object"" = hyperion
            }
            serialization-settings {
                hyperion {
                    preserve-object-references = true
                    version-tolerance = true
                    known-types-provider = ""MyApp.HyperionKnownTypes, MyApp""
                }
            }
        }
    }
");

var system = ActorSystem.Create("MySystem", config);

// Known types provider class
public class HyperionKnownTypes : IKnownTypesProvider
{
    public IEnumerable<Type> GetKnownTypes()
    {
        return new[]
        {
            typeof(OrderPlaced),
            typeof(OrderShipped),
            typeof(OrderCancelled)
        };
    }
}
```

## Serializer Wrapper Service

Wrap Hyperion in a service for dependency injection in non-Akka scenarios.

```csharp
using Hyperion;
using System.IO;

public interface IBinarySerializer
{
    byte[] Serialize<T>(T obj);
    T Deserialize<T>(byte[] data);
}

public sealed class HyperionBinarySerializer : IBinarySerializer
{
    private readonly Serializer _serializer;

    public HyperionBinarySerializer()
    {
        _serializer = new Serializer(new SerializerOptions(
            preserveObjectReferences: true,
            versionTolerance: true));
    }

    public byte[] Serialize<T>(T obj)
    {
        using var stream = new MemoryStream();
        _serializer.Serialize(obj, stream);
        return stream.ToArray();
    }

    public T Deserialize<T>(byte[] data)
    {
        using var stream = new MemoryStream(data);
        return _serializer.Deserialize<T>(stream);
    }
}

// Registration
builder.Services.AddSingleton<IBinarySerializer, HyperionBinarySerializer>();
```

## Serializer Comparison

| Feature | Hyperion | System.Text.Json | protobuf-net | Bond |
|---------|---------|-----------------|-------------|------|
| Format | Binary | JSON (text) | Binary (protobuf) | Binary (multiple) |
| Polymorphism | Automatic | Manual converters | ProtoInclude | Bond inheritance |
| Circular refs | Built-in | Not supported | Not supported | Not supported |
| Schema required | No | No | Attributes/proto | .bond files |
| Version tolerance | Yes | Limited | Yes | Yes |
| Best for | Akka.NET messages | REST APIs | Cross-language RPC | Microsoft services |

## Best Practices

1. **Enable `preserveObjectReferences` when object graphs may contain cycles**: without this option, circular references cause a `StackOverflowException` during serialization.
2. **Enable `versionTolerance` in production systems**: this allows you to add new fields to message types without breaking deserialization of data serialized with the previous version.
3. **Pre-register known types for frequently serialized classes**: adding types to the `knownTypes` list reduces payload size by replacing fully qualified type names with compact identifiers.
4. **Use Hyperion only for internal binary serialization**: do not expose Hyperion-serialized data to external consumers; it embeds .NET type metadata that creates tight coupling.
5. **Implement `IKnownTypesProvider` for Akka.NET**: centralize known type registration in a single class rather than scattering configuration across multiple HOCON files.
6. **Test version tolerance explicitly**: write tests that serialize an object with version N, add a field, and deserialize with version N+1 to verify backward compatibility.
7. **Wrap Hyperion behind `IBinarySerializer`**: decouple your business logic from Hyperion so you can switch to a different serializer (e.g., MessagePack) without touching domain code.
8. **Avoid serializing large object graphs in hot paths**: Hyperion's reference tracking adds overhead; for simple DTOs without circular references, consider disabling `preserveObjectReferences`.
9. **Pin Hyperion package versions across all services**: mismatched Hyperion versions between producer and consumer can cause deserialization failures due to wire format differences.
10. **Benchmark against MessagePack for non-Akka workloads**: Hyperion is optimized for Akka.NET patterns; for generic binary serialization, MessagePack may offer better throughput.
