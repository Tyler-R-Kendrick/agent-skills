---
name: grpc-dotnet
description: >
  Guidance for gRPC in .NET using Grpc.AspNetCore and Grpc.Net.Client.
  USE FOR: gRPC service definitions, proto file compilation, unary and streaming RPCs, gRPC client factory, deadline/cancellation, interceptors, gRPC-Web for browser clients.
  DO NOT USE FOR: REST/HTTP APIs (use ASP.NET Core), real-time browser push (use SignalR), custom TCP protocols (use dotnetty), email protocols (use mimekit).
license: MIT
metadata:
  displayName: "gRPC for .NET"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# gRPC for .NET

## Overview

gRPC is a high-performance RPC framework that uses Protocol Buffers (protobuf) for service contracts and HTTP/2 for transport. In .NET, `Grpc.AspNetCore` hosts gRPC services inside ASP.NET Core, and `Grpc.Net.Client` provides a strongly-typed client. gRPC supports four communication patterns: unary (request-response), server streaming, client streaming, and bidirectional streaming.

gRPC is the preferred choice for internal service-to-service communication where strong typing, code generation, and streaming are more valuable than REST's human-readability. The `.proto` files serve as the single source of truth for the service contract, generating both server stubs and client proxies at build time.

## Proto File Definition

Define the service contract in a `.proto` file. The protobuf compiler generates C# types and service stubs.

```protobuf
syntax = "proto3";

option csharp_namespace = "MyApp.Protos";

package orders;

service OrderService {
  rpc GetOrder (GetOrderRequest) returns (OrderReply);
  rpc ListOrders (ListOrdersRequest) returns (stream OrderReply);
  rpc UploadOrders (stream CreateOrderRequest) returns (UploadSummary);
  rpc OrderChat (stream OrderMessage) returns (stream OrderMessage);
}

message GetOrderRequest {
  string order_id = 1;
}

message ListOrdersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message CreateOrderRequest {
  string customer_name = 1;
  double total = 2;
  repeated OrderItemRequest items = 3;
}

message OrderItemRequest {
  string product_name = 1;
  int32 quantity = 2;
}

message OrderReply {
  string order_id = 1;
  string customer_name = 2;
  double total = 3;
  string created_at = 4;
}

message UploadSummary {
  int32 orders_created = 1;
}

message OrderMessage {
  string sender = 1;
  string content = 2;
}
```

## Server Implementation

Implement the generated base class on the server side.

```csharp
using Grpc.Core;
using MyApp.Protos;

namespace MyApp.Services;

public class OrderGrpcService : OrderService.OrderServiceBase
{
    private readonly IOrderRepository _repository;
    private readonly ILogger<OrderGrpcService> _logger;

    public OrderGrpcService(
        IOrderRepository repository,
        ILogger<OrderGrpcService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public override async Task<OrderReply> GetOrder(
        GetOrderRequest request, ServerCallContext context)
    {
        var order = await _repository.GetByIdAsync(request.OrderId);
        if (order is null)
        {
            throw new RpcException(new Status(
                StatusCode.NotFound,
                $"Order {request.OrderId} not found"));
        }

        return new OrderReply
        {
            OrderId = order.Id.ToString(),
            CustomerName = order.CustomerName,
            Total = (double)order.Total,
            CreatedAt = order.CreatedAt.ToString("O")
        };
    }

    public override async Task ListOrders(
        ListOrdersRequest request,
        IServerStreamWriter<OrderReply> responseStream,
        ServerCallContext context)
    {
        var orders = _repository.GetOrdersAsync(request.PageSize);

        await foreach (var order in orders
            .WithCancellation(context.CancellationToken))
        {
            await responseStream.WriteAsync(new OrderReply
            {
                OrderId = order.Id.ToString(),
                CustomerName = order.CustomerName,
                Total = (double)order.Total,
                CreatedAt = order.CreatedAt.ToString("O")
            });
        }
    }
}
```

## Server Registration

Register gRPC services in ASP.NET Core.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc(options =>
{
    options.MaxReceiveMessageSize = 16 * 1024 * 1024; // 16 MB
    options.MaxSendMessageSize = 16 * 1024 * 1024;
    options.EnableDetailedErrors = builder.Environment.IsDevelopment();
});

var app = builder.Build();
app.MapGrpcService<MyApp.Services.OrderGrpcService>();
app.Run();
```

## Client with GrpcClientFactory

Use the typed client factory for DI-integrated gRPC clients with resilience.

```csharp
using Microsoft.Extensions.DependencyInjection;
using MyApp.Protos;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGrpcClient<OrderService.OrderServiceClient>(options =>
    {
        options.Address = new Uri("https://localhost:5001");
    })
    .ConfigureChannel(options =>
    {
        options.MaxReceiveMessageSize = 16 * 1024 * 1024;
    })
    .AddCallCredentials(async (context, metadata) =>
    {
        var token = await GetTokenAsync();
        metadata.Add("Authorization", $"Bearer {token}");
    });

var app = builder.Build();
app.Run();

static Task<string> GetTokenAsync()
    => Task.FromResult("my-jwt-token");
```

## Client Usage with Deadlines and Cancellation

Always set deadlines on gRPC calls to prevent indefinite waits.

```csharp
using Grpc.Core;
using MyApp.Protos;

namespace MyApp.Services;

public class OrderClientService
{
    private readonly OrderService.OrderServiceClient _client;

    public OrderClientService(
        OrderService.OrderServiceClient client)
    {
        _client = client;
    }

    public async Task<OrderReply> GetOrderAsync(
        string orderId, CancellationToken ct)
    {
        var request = new GetOrderRequest { OrderId = orderId };

        var callOptions = new CallOptions(
            deadline: DateTime.UtcNow.AddSeconds(5),
            cancellationToken: ct);

        try
        {
            return await _client.GetOrderAsync(request, callOptions);
        }
        catch (RpcException ex) when (
            ex.StatusCode == StatusCode.DeadlineExceeded)
        {
            throw new TimeoutException(
                $"GetOrder timed out for {orderId}", ex);
        }
        catch (RpcException ex) when (
            ex.StatusCode == StatusCode.NotFound)
        {
            throw new KeyNotFoundException(
                $"Order {orderId} not found", ex);
        }
    }

    public async IAsyncEnumerable<OrderReply> ListOrdersAsync(
        int pageSize,
        [System.Runtime.CompilerServices.EnumeratorCancellation]
        CancellationToken ct = default)
    {
        var request = new ListOrdersRequest { PageSize = pageSize };

        using var call = _client.ListOrders(
            request,
            deadline: DateTime.UtcNow.AddSeconds(30),
            cancellationToken: ct);

        await foreach (var reply in call.ResponseStream
            .ReadAllAsync(ct))
        {
            yield return reply;
        }
    }
}
```

## Interceptors

Interceptors provide cross-cutting concerns (logging, metrics, auth) for gRPC calls.

```csharp
using Grpc.Core;
using Grpc.Core.Interceptors;
using Microsoft.Extensions.Logging;

namespace MyApp.Interceptors;

public class LoggingInterceptor : Interceptor
{
    private readonly ILogger<LoggingInterceptor> _logger;

    public LoggingInterceptor(ILogger<LoggingInterceptor> logger)
    {
        _logger = logger;
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        _logger.LogInformation(
            "gRPC call: {Method}", context.Method);

        var sw = System.Diagnostics.Stopwatch.StartNew();
        try
        {
            var response = await continuation(request, context);
            sw.Stop();
            _logger.LogInformation(
                "gRPC {Method} completed in {ElapsedMs}ms",
                context.Method, sw.ElapsedMilliseconds);
            return response;
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex,
                "gRPC {Method} failed after {ElapsedMs}ms",
                context.Method, sw.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## gRPC Communication Patterns

| Pattern | Client | Server | Use Case |
|---|---|---|---|
| Unary | Single request | Single response | CRUD operations |
| Server streaming | Single request | Stream of responses | Feed/list retrieval |
| Client streaming | Stream of requests | Single response | Batch upload |
| Bidirectional streaming | Stream of requests | Stream of responses | Chat, real-time sync |

## Best Practices

1. **Always set deadlines** on client calls using `CallOptions.Deadline` or `deadline:` parameter to prevent indefinite waits when the server is unresponsive.
2. **Use `.proto` files as the single source of truth** for service contracts and share them via a NuGet package or git submodule across client and server repositories.
3. **Use `GrpcClientFactory`** (`AddGrpcClient<T>`) instead of manually creating channels, so clients benefit from `HttpClientFactory` pooling, resilience handlers, and DI integration.
4. **Enable server reflection** in development (`builder.Services.AddGrpcReflection()`) so tools like `grpcurl` and `grpcui` can discover and test services without the `.proto` file.
5. **Handle `RpcException` by `StatusCode`** on the client side and throw `RpcException` with appropriate status codes on the server side instead of returning error payloads in the response message.
6. **Use server streaming for large result sets** instead of returning a single response with a large repeated field, to reduce memory pressure and enable progressive rendering.
7. **Register interceptors for cross-cutting concerns** (logging, metrics, auth token injection) rather than duplicating the logic in every service method.
8. **Set `MaxReceiveMessageSize` and `MaxSendMessageSize`** explicitly on both client and server to prevent out-of-memory errors from oversized messages (default is 4 MB).
9. **Use gRPC-Web** (`app.MapGrpcService<T>().EnableGrpcWeb()`) when browser clients need to call gRPC services, as browsers do not support HTTP/2 trailers natively.
10. **Version proto packages** using the `package` directive (e.g., `orders.v1`) and maintain backward compatibility by never removing or renumbering existing fields.
