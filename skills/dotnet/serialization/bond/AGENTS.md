# Bond

## Overview

Bond is a cross-platform, schema-first serialization framework developed by Microsoft. It defines data schemas in `.bond` files that are compiled into language-specific classes, supporting C#, C++, Python, and Java. Bond provides three binary protocols (Compact Binary, Fast Binary, and Simple Binary) and a JSON protocol. It excels in scenarios requiring high-performance serialization with schema evolution guarantees, making it popular in large-scale distributed systems at Microsoft. Bond handles schema versioning gracefully, allowing fields to be added or removed without breaking existing consumers.

## Schema Definition

Define your data structures in `.bond` schema files.

```
// schemas/models.bond
namespace Example.Models;

enum Priority
{
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3
}

struct Address
{
    0: string Street;
    1: string City;
    2: string State;
    3: string ZipCode;
    4: string Country = "US";
}

struct Person
{
    0: string FirstName;
    1: string LastName;
    2: uint32 Age;
    3: nullable<Address> HomeAddress;
    4: vector<string> EmailAddresses;
    5: map<string, string> Metadata;
    6: Priority Priority = Medium;
}
```

## Compact Binary Serialization

Use Compact Binary protocol for the best balance of size and speed.

```csharp
using Bond;
using Bond.IO.Unsafe;
using Bond.Protocols;
using Example.Models;

// Create an object
var person = new Person
{
    FirstName = "Alice",
    LastName = "Smith",
    Age = 30,
    HomeAddress = new Address
    {
        Street = "123 Main St",
        City = "Seattle",
        State = "WA",
        ZipCode = "98101"
    },
    EmailAddresses = { "alice@example.com", "alice@work.com" },
    Metadata = { ["department"] = "Engineering" },
    Priority = Priority.High
};

// Serialize to Compact Binary
var output = new OutputBuffer();
var writer = new CompactBinaryWriter<OutputBuffer>(output);
Serialize.To(writer, person);
byte[] serializedBytes = output.Data.ToArray();

// Deserialize from Compact Binary
var input = new InputBuffer(serializedBytes);
var reader = new CompactBinaryReader<InputBuffer>(input);
Person deserialized = Deserialize<Person>.From(reader);
```

## Fast Binary Serialization

Use Fast Binary for maximum deserialization speed when payload size is less critical.

```csharp
using Bond;
using Bond.IO.Unsafe;
using Bond.Protocols;
using Example.Models;

var person = new Person
{
    FirstName = "Bob",
    LastName = "Jones",
    Age = 25
};

// Fast Binary - optimized for deserialization speed
var output = new OutputBuffer();
var writer = new FastBinaryWriter<OutputBuffer>(output);
Serialize.To(writer, person);
byte[] fastBytes = output.Data.ToArray();

// Deserialize
var input = new InputBuffer(fastBytes);
var reader = new FastBinaryReader<InputBuffer>(input);
Person result = Deserialize<Person>.From(reader);
```

## JSON Protocol

Use the JSON protocol for debugging, logging, or interop with non-Bond systems.

```csharp
using Bond;
using Bond.IO.Unsafe;
using Bond.Protocols;
using Example.Models;
using System.IO;
using System.Text;

var person = new Person
{
    FirstName = "Carol",
    LastName = "Davis",
    Age = 35,
    EmailAddresses = { "carol@example.com" }
};

// Serialize to JSON
using var textWriter = new StringWriter();
var jsonWriter = new SimpleJsonWriter(textWriter);
Serialize.To(jsonWriter, person);
jsonWriter.Flush();
string json = textWriter.ToString();

// Deserialize from JSON
var jsonReader = new SimpleJsonReader(
    new StringReader(json));
Person fromJson = Deserialize<Person>.From(jsonReader);
```

## Schema Evolution

Bond supports adding and removing fields while maintaining compatibility.

```csharp
using Bond;
using Bond.IO.Unsafe;
using Bond.Protocols;

// Version 1 schema
// struct Order { 0: string Id; 1: double Amount; }

// Version 2 schema adds a new field
// struct Order { 0: string Id; 1: double Amount; 2: string Currency = "USD"; }

// Data serialized with V1 can be deserialized with V2
// The new field gets its default value ("USD")

// Data serialized with V2 can be deserialized with V1
// The unknown field (Currency) is safely skipped

// Example: transcoding between protocols with schema migration
var inputBuffer = new InputBuffer(v1SerializedData);
var reader = new CompactBinaryReader<InputBuffer>(inputBuffer);

var outputBuffer = new OutputBuffer();
var writer = new CompactBinaryWriter<OutputBuffer>(outputBuffer);

// Transcode automatically handles schema differences
Transcode<CompactBinaryReader<InputBuffer>,
          CompactBinaryWriter<OutputBuffer>>
    .From(reader, writer);
```

## Service Integration Pattern

Register Bond serialization as a service for dependency injection.

```csharp
using Bond;
using Bond.IO.Unsafe;
using Bond.Protocols;

public interface IBondSerializer
{
    byte[] Serialize<T>(T obj) where T : new();
    T Deserialize<T>(byte[] data) where T : new();
}

public sealed class CompactBondSerializer : IBondSerializer
{
    public byte[] Serialize<T>(T obj) where T : new()
    {
        var output = new OutputBuffer();
        var writer = new CompactBinaryWriter<OutputBuffer>(output);
        Bond.Serialize.To(writer, obj);
        return output.Data.ToArray();
    }

    public T Deserialize<T>(byte[] data) where T : new()
    {
        var input = new InputBuffer(data);
        var reader = new CompactBinaryReader<InputBuffer>(input);
        return Bond.Deserialize<T>.From(reader);
    }
}

// Registration
builder.Services.AddSingleton<IBondSerializer, CompactBondSerializer>();
```

## Protocol Comparison

| Protocol | Serialization Speed | Deserialization Speed | Payload Size | Human Readable |
|----------|-------------------|-----------------------|-------------|----------------|
| Compact Binary | Fast | Fast | Smallest | No |
| Fast Binary | Fast | Fastest | Larger | No |
| Simple Binary | Fastest | Fast | Medium | No |
| Simple JSON | Slow | Slow | Largest | Yes |

## Best Practices

1. **Define all data contracts in `.bond` schema files**: use the Bond code generator (`gbc`) to produce C# classes rather than hand-coding `[Bond.Schema]` attributes, ensuring schema consistency across languages.
2. **Assign explicit field ordinals starting from 0**: every field must have a unique, stable ordinal number that never changes once published; use gaps (0, 1, 5, 10) to reserve space for future fields.
3. **Use Compact Binary as the default wire format**: it provides the best tradeoff between serialization speed and payload size for most production workloads.
4. **Set meaningful default values for new fields**: when evolving a schema, new fields with defaults allow old consumers to deserialize new data without errors.
5. **Never reuse or reassign field ordinals**: removing a field should retire its ordinal permanently; reusing it with a different type breaks backward compatibility.
6. **Use `nullable<T>` for optional complex fields**: this allows the field to be absent on the wire and avoids allocating empty objects during deserialization.
7. **Wrap Bond serialization behind an interface**: inject `IBondSerializer` so you can swap protocols (Compact to Fast) or migrate to a different serialization library without changing business logic.
8. **Benchmark serialization in your specific workload**: use BenchmarkDotNet to compare Compact vs. Fast vs. Simple Binary for your actual data shapes, as performance varies by schema complexity.
9. **Version your `.bond` schema files in source control**: treat schema files as API contracts with pull request reviews, semantic versioning, and breaking-change detection in CI.
10. **Use transcoding for protocol conversion**: when bridging systems that use different Bond protocols, use `Transcode` instead of deserialize-then-reserialize to avoid unnecessary object allocation.
