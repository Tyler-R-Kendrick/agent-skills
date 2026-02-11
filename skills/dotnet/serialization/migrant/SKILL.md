---
name: migrant
description: >
  Guidance for Migrant fast binary serialization library for .NET.
  USE FOR: fast binary serialization of complex object graphs, version-tolerant deserialization,
  simulation state snapshots, game save/load systems, deep object cloning via serialization,
  internal data persistence with circular reference support.
  DO NOT USE FOR: cross-language interop (use protobuf-net), REST API responses (use System.Text.Json),
  human-readable data formats, or long-term archival storage with strict schema guarantees.
license: MIT
metadata:
  displayName: "Migrant"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Migrant

## Overview

Migrant is a fast, flexible binary serialization framework for .NET that emphasizes ease of use and version-tolerant deserialization. It can serialize virtually any .NET object graph, including private fields, circular references, and types implementing `ISerializable`, without requiring explicit attributes or schema definitions. Migrant generates optimized serialization code at runtime using IL emission, delivering performance close to hand-written serialization. It is particularly well-suited for simulation state snapshots, game save systems, and any scenario where you need to persist complex in-memory object graphs with minimal configuration.

## Basic Serialization

Serialize and deserialize objects with zero configuration.

```csharp
using Antmicro.Migrant;
using System.IO;

public class GameState
{
    public string PlayerName { get; set; } = string.Empty;
    public int Level { get; set; }
    public double Health { get; set; }
    public List<string> Inventory { get; set; } = new();
    public Dictionary<string, int> Skills { get; set; } = new();
}

var serializer = new Serializer();

var state = new GameState
{
    PlayerName = "Alice",
    Level = 42,
    Health = 87.5,
    Inventory = { "Sword", "Shield", "Potion" },
    Skills = { ["Combat"] = 10, ["Magic"] = 7 }
};

// Serialize to file
using (var fileStream = File.Create("savegame.bin"))
{
    serializer.Serialize(state, fileStream);
}

// Deserialize from file
using (var fileStream = File.OpenRead("savegame.bin"))
{
    var loaded = serializer.Deserialize<GameState>(fileStream);
}
```

## Serializer Settings

Configure Migrant behavior with the `Settings` class.

```csharp
using Antmicro.Migrant;
using Antmicro.Migrant.Customization;

var settings = new Settings(
    // Support types implementing ISerializable
    supportForISerializable: true,
    // Use buffering for better performance
    useBuffering: true,
    // Disable the stamp check for version tolerance
    disableTypeStamping: false,
    // Control reference tracking
    referencePreservation: ReferencePreservation.Preserve,
    // Allow version differences during deserialization
    versionTolerance: VersionToleranceLevel.AllowFieldAddition
        | VersionToleranceLevel.AllowFieldRemoval
);

var serializer = new Serializer(settings);
```

## Version-Tolerant Deserialization

Migrant handles type evolution gracefully when fields are added or removed.

```csharp
using Antmicro.Migrant;
using Antmicro.Migrant.Customization;
using System.IO;

// Version 1 of the class
public class ConfigV1
{
    public string Name { get; set; } = string.Empty;
    public int Timeout { get; set; }
}

// Version 2 adds a new field
public class ConfigV2
{
    public string Name { get; set; } = string.Empty;
    public int Timeout { get; set; }
    public string Region { get; set; } = "us-east-1"; // new field
    public bool Enabled { get; set; } = true;          // new field
}

var settings = new Settings(
    versionTolerance: VersionToleranceLevel.AllowFieldAddition
        | VersionToleranceLevel.AllowFieldRemoval
        | VersionToleranceLevel.AllowGuidChange);

var serializer = new Serializer(settings);

// Data serialized with V1 can be deserialized as V2
// New fields get their default values
using var stream = new MemoryStream();
serializer.Serialize(new ConfigV1 { Name = "prod", Timeout = 30 }, stream);

stream.Position = 0;
// The new fields (Region, Enabled) will have their default values
var config = serializer.Deserialize<ConfigV2>(stream);
// config.Region == "us-east-1", config.Enabled == true
```

## Circular Reference and Deep Graph Handling

Migrant handles circular references and deep object graphs automatically.

```csharp
using Antmicro.Migrant;
using System.IO;

public class SimulationNode
{
    public string Id { get; set; } = string.Empty;
    public double Value { get; set; }
    public SimulationNode? Next { get; set; }
    public SimulationNode? Previous { get; set; }
    public List<SimulationNode> Connections { get; set; } = new();
}

var serializer = new Serializer();

// Build a circular linked structure
var node1 = new SimulationNode { Id = "A", Value = 1.0 };
var node2 = new SimulationNode { Id = "B", Value = 2.0 };
var node3 = new SimulationNode { Id = "C", Value = 3.0 };

node1.Next = node2; node2.Previous = node1;
node2.Next = node3; node3.Previous = node2;
node3.Next = node1; node1.Previous = node3; // circular

node1.Connections.AddRange(new[] { node2, node3 });
node2.Connections.AddRange(new[] { node1, node3 });

// Serialize the circular graph without issues
using var stream = new MemoryStream();
serializer.Serialize(node1, stream);

stream.Position = 0;
var restored = serializer.Deserialize<SimulationNode>(stream);
// restored.Next.Previous == restored (references preserved)
```

## Deep Cloning via Serialization

Use Migrant's serializer for deep cloning complex object graphs.

```csharp
using Antmicro.Migrant;
using System.IO;

public static class DeepCloner
{
    private static readonly Serializer _serializer = new(new Settings(
        useBuffering: true,
        referencePreservation: ReferencePreservation.Preserve));

    public static T Clone<T>(T obj)
    {
        using var stream = new MemoryStream();
        _serializer.Serialize(obj, stream);
        stream.Position = 0;
        return _serializer.Deserialize<T>(stream);
    }
}

// Usage: deep clone a complex state object
var original = new GameState
{
    PlayerName = "Bob",
    Level = 10,
    Inventory = { "Axe", "Torch" }
};

var snapshot = DeepCloner.Clone(original);
// snapshot is a completely independent copy
snapshot.Inventory.Add("Gem");
// original.Inventory still has only "Axe" and "Torch"
```

## Transient and Custom Serialization Hooks

Control serialization behavior with attributes and hooks.

```csharp
using Antmicro.Migrant;
using System.IO;

public class CachedService
{
    public string ServiceName { get; set; } = string.Empty;
    public string ConnectionString { get; set; } = string.Empty;

    [Transient] // This field is skipped during serialization
    private HttpClient? _httpClient;

    [PostDeserialization]
    private void OnDeserialized()
    {
        // Rebuild transient state after deserialization
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(ConnectionString)
        };
    }

    public HttpClient GetClient() =>
        _httpClient ?? throw new InvalidOperationException(
            "Service not initialized.");
}

var serializer = new Serializer();
var service = new CachedService
{
    ServiceName = "OrderAPI",
    ConnectionString = "https://api.example.com"
};

using var stream = new MemoryStream();
serializer.Serialize(service, stream);

stream.Position = 0;
var restored = serializer.Deserialize<CachedService>(stream);
// _httpClient is rebuilt by [PostDeserialization] hook
```

## Serializer Comparison

| Feature | Migrant | Hyperion | BinaryFormatter | System.Text.Json |
|---------|---------|---------|-----------------|-----------------|
| Format | Binary | Binary | Binary | JSON (text) |
| Schema required | No | No | No | No |
| Circular references | Yes | Yes | Yes | No |
| Version tolerance | Configurable | Yes | Limited | Limited |
| Performance | Very fast (IL emit) | Fast | Slow | Fast (text) |
| Private fields | Yes | Yes | Yes | No (default) |
| Best for | State snapshots | Akka.NET | Legacy (obsolete) | REST APIs |

## Best Practices

1. **Enable version tolerance flags for any data that persists beyond a single app version**: use `AllowFieldAddition | AllowFieldRemoval` to ensure saved data remains loadable after class changes.
2. **Use `[Transient]` for runtime-only state**: mark fields like HTTP clients, caches, and database connections as transient so they are skipped during serialization and rebuilt on deserialization.
3. **Implement `[PostDeserialization]` hooks to rebuild transient state**: use this attribute on private methods to reinitialize connections, caches, or computed values after deserialization.
4. **Enable `useBuffering` for large serialization operations**: buffering improves throughput by reducing the number of I/O operations to the underlying stream.
5. **Use `ReferencePreservation.Preserve` when object identity matters**: this ensures that two references to the same object remain the same reference after deserialization, critical for circular graphs.
6. **Create a reusable `Serializer` instance**: the Migrant serializer generates IL at runtime for each type it encounters; reusing the instance amortizes this startup cost across multiple operations.
7. **Test version tolerance with actual old serialized data**: keep binary snapshots from previous versions in your test suite and verify they deserialize correctly with the current type definitions.
8. **Avoid using Migrant for cross-process communication**: Migrant embeds .NET type information that tightly couples serializer and deserializer; use protobuf-net or Bond for inter-service messaging.
9. **Use deep cloning sparingly in hot paths**: serialization-based cloning is convenient but allocates intermediate buffers; for performance-critical cloning, consider manual copy constructors.
10. **Monitor serialized data size growth**: as types evolve and fields accumulate, serialized payload sizes can grow; periodically benchmark payload sizes and consider migration strategies for bloated types.
