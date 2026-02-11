---
name: protobuf-net
description: >
  Guidance for protobuf-net Protocol Buffers serializer for .NET.
  USE FOR: high-performance binary serialization, gRPC service contracts, cross-language data interchange,
  compact wire format for microservices, schema evolution with backward compatibility, replacing JSON
  in performance-critical inter-service communication.
  DO NOT USE FOR: human-readable serialization (use System.Text.Json), polymorphic type hierarchies
  without planning, dynamic/schema-less data, or browser-facing REST APIs expecting JSON.
license: MIT
metadata:
  displayName: "protobuf-net"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "protobuf-net GitHub Repository"
    url: "https://github.com/protobuf-net/protobuf-net"
  - title: "protobuf-net Documentation"
    url: "https://protobuf-net.github.io/protobuf-net/"
  - title: "protobuf-net NuGet Package"
    url: "https://www.nuget.org/packages/protobuf-net"
---

# protobuf-net

## Overview

protobuf-net is a .NET implementation of Google Protocol Buffers, providing fast, compact binary serialization using either attribute-based or code-first configuration. It produces wire-compatible output with Google's official protobuf implementations in other languages (Java, Go, Python, C++), making it ideal for cross-language microservice communication. protobuf-net supports schema evolution (adding/removing fields without breaking consumers), inheritance hierarchies via `ProtoInclude`, and integration with gRPC. It consistently outperforms JSON serializers in both throughput and payload size for structured data.

## Basic Attribute-Based Serialization

Annotate data contracts with `[ProtoContract]` and `[ProtoMember]` attributes.

```csharp
using ProtoBuf;
using System.IO;

[ProtoContract]
public class Order
{
    [ProtoMember(1)]
    public int Id { get; set; }

    [ProtoMember(2)]
    public string CustomerId { get; set; } = string.Empty;

    [ProtoMember(3)]
    public decimal TotalAmount { get; set; }

    [ProtoMember(4)]
    public DateTimeOffset CreatedAt { get; set; }

    [ProtoMember(5)]
    public List<OrderItem> Items { get; set; } = new();

    [ProtoMember(6)]
    public OrderStatus Status { get; set; }
}

[ProtoContract]
public class OrderItem
{
    [ProtoMember(1)]
    public string ProductId { get; set; } = string.Empty;

    [ProtoMember(2)]
    public string ProductName { get; set; } = string.Empty;

    [ProtoMember(3)]
    public int Quantity { get; set; }

    [ProtoMember(4)]
    public decimal UnitPrice { get; set; }
}

[ProtoContract]
public enum OrderStatus
{
    Pending = 0,
    Confirmed = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4
}

// Serialize
var order = new Order
{
    Id = 1001,
    CustomerId = "cust-42",
    TotalAmount = 149.97m,
    CreatedAt = DateTimeOffset.UtcNow,
    Status = OrderStatus.Confirmed,
    Items =
    {
        new OrderItem { ProductId = "SKU-A", ProductName = "Widget", Quantity = 3, UnitPrice = 49.99m }
    }
};

using var writeStream = new MemoryStream();
Serializer.Serialize(writeStream, order);
byte[] bytes = writeStream.ToArray();

// Deserialize
using var readStream = new MemoryStream(bytes);
var restored = Serializer.Deserialize<Order>(readStream);
```

## Schema Evolution

Add and deprecate fields while maintaining backward and forward compatibility.

```csharp
using ProtoBuf;

// Version 1
[ProtoContract]
public class UserProfileV1
{
    [ProtoMember(1)]
    public int Id { get; set; }

    [ProtoMember(2)]
    public string Name { get; set; } = string.Empty;

    [ProtoMember(3)]
    public string Email { get; set; } = string.Empty;
}

// Version 2: added fields, removed none
[ProtoContract]
public class UserProfileV2
{
    [ProtoMember(1)]
    public int Id { get; set; }

    [ProtoMember(2)]
    public string Name { get; set; } = string.Empty;

    [ProtoMember(3)]
    public string Email { get; set; } = string.Empty;

    // New in V2: field number 4 was never used before
    [ProtoMember(4)]
    public string AvatarUrl { get; set; } = string.Empty;

    [ProtoMember(5)]
    public List<string> Roles { get; set; } = new();
}

// V1 data deserializes into V2 with default values for new fields
// V2 data deserializes into V1 with unknown fields safely ignored
```

## Inheritance Hierarchies

Use `[ProtoInclude]` to support polymorphic serialization.

```csharp
using ProtoBuf;
using System.IO;

[ProtoContract]
[ProtoInclude(10, typeof(CreditCardPayment))]
[ProtoInclude(11, typeof(BankTransferPayment))]
[ProtoInclude(12, typeof(WalletPayment))]
public abstract class Payment
{
    [ProtoMember(1)]
    public string TransactionId { get; set; } = string.Empty;

    [ProtoMember(2)]
    public decimal Amount { get; set; }

    [ProtoMember(3)]
    public DateTimeOffset Timestamp { get; set; }
}

[ProtoContract]
public class CreditCardPayment : Payment
{
    [ProtoMember(1)]
    public string CardLast4 { get; set; } = string.Empty;

    [ProtoMember(2)]
    public string CardBrand { get; set; } = string.Empty;
}

[ProtoContract]
public class BankTransferPayment : Payment
{
    [ProtoMember(1)]
    public string BankName { get; set; } = string.Empty;

    [ProtoMember(2)]
    public string AccountLast4 { get; set; } = string.Empty;
}

[ProtoContract]
public class WalletPayment : Payment
{
    [ProtoMember(1)]
    public string WalletProvider { get; set; } = string.Empty;
}

// Polymorphic round-trip
Payment payment = new CreditCardPayment
{
    TransactionId = "txn-789",
    Amount = 59.99m,
    Timestamp = DateTimeOffset.UtcNow,
    CardLast4 = "4242",
    CardBrand = "Visa"
};

using var stream = new MemoryStream();
Serializer.Serialize(stream, payment);
stream.Position = 0;
Payment deserialized = Serializer.Deserialize<Payment>(stream);
// deserialized is CreditCardPayment
```

## Runtime Type Model (Code-First)

Configure serialization without attributes using `RuntimeTypeModel`.

```csharp
using ProtoBuf;
using ProtoBuf.Meta;
using System.IO;

// Types without attributes
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
}

// Configure at startup
var model = RuntimeTypeModel.Create();
model.Add(typeof(Product), false)
    .Add(1, nameof(Product.Id))
    .Add(2, nameof(Product.Name))
    .Add(3, nameof(Product.Price))
    .Add(4, nameof(Product.Category));

// Serialize using the configured model
var product = new Product
{
    Id = 42,
    Name = "Premium Widget",
    Price = 29.99m,
    Category = "Hardware"
};

using var stream = new MemoryStream();
model.Serialize(stream, product);
stream.Position = 0;
var restored = model.Deserialize<Product>(stream);
```

## gRPC Integration

Use protobuf-net with gRPC for high-performance .NET services.

```csharp
using ProtoBuf.Grpc;
using ProtoBuf.Grpc.Configuration;
using System.ServiceModel;
using System.Runtime.Serialization;

// Define service contract
[ServiceContract]
public interface IOrderService
{
    [OperationContract]
    Task<OrderResponse> GetOrderAsync(OrderRequest request);

    [OperationContract]
    Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request);
}

[DataContract]
public class OrderRequest
{
    [DataMember(Order = 1)]
    public int OrderId { get; set; }
}

[DataContract]
public class OrderResponse
{
    [DataMember(Order = 1)]
    public int Id { get; set; }

    [DataMember(Order = 2)]
    public string Status { get; set; } = string.Empty;

    [DataMember(Order = 3)]
    public decimal Total { get; set; }
}

// Server implementation
public class OrderServiceImpl : IOrderService
{
    public Task<OrderResponse> GetOrderAsync(OrderRequest request)
    {
        return Task.FromResult(new OrderResponse
        {
            Id = request.OrderId,
            Status = "Confirmed",
            Total = 99.99m
        });
    }

    public Task<CreateOrderResponse> CreateOrderAsync(
        CreateOrderRequest request) =>
        throw new NotImplementedException();
}

// Program.cs server registration
builder.Services.AddCodeFirstGrpc();
app.MapGrpcService<OrderServiceImpl>();

// Client usage
using var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = channel.CreateGrpcService<IOrderService>();
var response = await client.GetOrderAsync(new OrderRequest { OrderId = 1 });
```

## Serialization Format Comparison

| Feature | protobuf-net | System.Text.Json | Bond | MessagePack |
|---------|-------------|-----------------|------|-------------|
| Format | Binary (protobuf) | Text (JSON) | Binary (multiple) | Binary (msgpack) |
| Payload size | Very small | Large | Small | Small |
| Serialization speed | Very fast | Fast | Fast | Very fast |
| Cross-language | Excellent | Excellent | Good | Excellent |
| Schema evolution | Strong | Weak | Strong | Moderate |
| Human readable | No | Yes | No | No |
| gRPC support | Native | No | No | No |

## Best Practices

1. **Assign stable, unique field numbers that never change**: once a `[ProtoMember(N)]` number is assigned and data is serialized, that number is permanently bound to that field; never reuse numbers from removed fields.
2. **Start field numbers at 1 and leave gaps for future fields**: use 1, 2, 3 for initial fields and reserve ranges (e.g., 10-19 for a logical group) to allow inserting related fields later.
3. **Use `RuntimeTypeModel` for types you do not control**: configure serialization for third-party DTOs at startup rather than requiring attribute annotations on external types.
4. **Declare `[ProtoInclude]` on base types for inheritance**: each derived type needs a unique tag number on the base class; plan these carefully as they cannot change after deployment.
5. **Prefer `Serializer.Serialize` to stream over byte arrays**: serialize directly to `Stream` (network, file) to avoid intermediate `byte[]` allocations; use `MemoryStream` only when you need the bytes.
6. **Set enum zero values to meaningful defaults**: protobuf treats zero as the default; name your zero enum member `Unknown` or `Unspecified` so missing values are clearly identifiable.
7. **Use protobuf-net with code-first gRPC for .NET-to-.NET services**: `protobuf-net.Grpc` allows you to define service contracts as C# interfaces, avoiding `.proto` file management.
8. **Benchmark protobuf-net against JSON for your specific payloads**: while protobuf is typically faster, small or sparse objects may not benefit enough to justify the complexity.
9. **Pin `[ProtoContract(SkipConstructor = true)]` for immutable types**: this tells protobuf-net to bypass the constructor during deserialization, avoiding issues with required constructor parameters.
10. **Generate `.proto` files from your C# types for cross-language consumers**: use `Serializer.GetProto<T>()` to export `.proto` schema files that Java, Go, or Python clients can compile and use.
