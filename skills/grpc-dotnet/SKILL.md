---
name: grpc-dotnet
description: Guidance for gRPC in .NET. Use when working with grpc dotnet.
license: MIT
metadata:
  displayName: "gRPC for .NET"
  author: "Tyler-R-Kendrick"
---

# gRPC for .NET

## Overview
Use gRPC for service-to-service contracts with strong typing and streaming.

## Setup
```csharp
builder.Services.AddGrpc();
```

## Example
```csharp
var app = builder.Build();
app.MapGrpcService<GreeterService>();
```

## Guidance
- Use proto contracts as the source of truth.
- Prefer gRPC streaming for high-throughput flows.