# SignalR

## Overview

ASP.NET Core SignalR is a library for adding real-time web functionality to applications. It enables server-side code to push content to connected clients instantly using WebSockets (preferred), Server-Sent Events, or long polling as fallback transports. SignalR manages connections, groups, and message serialization automatically. It supports hub-based programming where server methods are called from clients and client methods are invoked from the server. SignalR integrates with ASP.NET Core authentication and authorization, supports strongly-typed hubs, and scales horizontally using Redis, Azure SignalR Service, or SQL Server as a backplane for multi-server deployments.

## Hub Implementation

Create a hub that handles client connections and messages.

```csharp
using Microsoft.AspNetCore.SignalR;

namespace MyApp.Hubs;

public class ChatHub : Hub
{
    private readonly ILogger<ChatHub> _logger;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(string user, string message)
    {
        _logger.LogInformation("Message from {User}: {Message}", user, message);
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task SendToGroup(string groupName, string user, string message)
    {
        await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync(
            "SystemMessage", $"{Context.User?.Identity?.Name ?? "Anonymous"} joined {groupName}");
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync(
            "SystemMessage", $"{Context.User?.Identity?.Name ?? "Anonymous"} left {groupName}");
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation("Client connected: {ConnectionId}", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation(
            "Client disconnected: {ConnectionId}, Reason: {Reason}",
            Context.ConnectionId,
            exception?.Message ?? "Normal");
        await base.OnDisconnectedAsync(exception);
    }
}
```

## Server Setup and Configuration

Configure SignalR in an ASP.NET Core application with authentication and scaling.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MyApp.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://identity.mysite.com";
        options.Audience = "myapp";

        // SignalR sends JWT via query string for WebSockets
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = builder.Environment.IsDevelopment();
    options.MaximumReceiveMessageSize = 64 * 1024; // 64 KB
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
})
.AddJsonProtocol(options =>
{
    options.PayloadSerializerOptions.PropertyNamingPolicy =
        System.Text.Json.JsonNamingPolicy.CamelCase;
});

// Scale-out with Redis backplane
// builder.Services.AddSignalR().AddStackExchangeRedis(
//     builder.Configuration.GetConnectionString("Redis")!);

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/hubs/chat");
app.MapHub<NotificationHub>("/hubs/notifications")
    .RequireAuthorization();

app.Run();
```

## Strongly-Typed Hub

Use a strongly-typed hub interface for compile-time safety on client method calls.

```csharp
using Microsoft.AspNetCore.SignalR;

namespace MyApp.Hubs;

public interface INotificationClient
{
    Task ReceiveNotification(NotificationDto notification);
    Task UpdateOnlineCount(int count);
    Task ReceiveTypingIndicator(string userId, bool isTyping);
    Task OrderStatusChanged(string orderId, string newStatus);
}

public class NotificationHub : Hub<INotificationClient>
{
    private static int _onlineCount;

    public async Task SubscribeToOrder(string orderId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"order-{orderId}");
    }

    public async Task UnsubscribeFromOrder(string orderId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"order-{orderId}");
    }

    public async Task SetTyping(string conversationId, bool isTyping)
    {
        await Clients.OthersInGroup(conversationId)
            .ReceiveTypingIndicator(Context.UserIdentifier!, isTyping);
    }

    public override async Task OnConnectedAsync()
    {
        var count = Interlocked.Increment(ref _onlineCount);
        await Clients.All.UpdateOnlineCount(count);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var count = Interlocked.Decrement(ref _onlineCount);
        await Clients.All.UpdateOnlineCount(count);
        await base.OnDisconnectedAsync(exception);
    }
}

public record NotificationDto(
    string Id,
    string Title,
    string Message,
    string Severity,
    DateTime Timestamp);
```

## Sending Messages from Outside Hubs

Use `IHubContext<T>` to send messages from controllers, services, or background workers.

```csharp
using Microsoft.AspNetCore.SignalR;
using MyApp.Hubs;

namespace MyApp.Services;

public class OrderProcessingService
{
    private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;
    private readonly ILogger<OrderProcessingService> _logger;

    public OrderProcessingService(
        IHubContext<NotificationHub, INotificationClient> hubContext,
        ILogger<OrderProcessingService> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
    }

    public async Task ProcessOrderAsync(Order order)
    {
        order.Status = OrderStatus.Processing;
        // ... process order ...

        // Notify all clients subscribed to this order
        await _hubContext.Clients
            .Group($"order-{order.Id}")
            .OrderStatusChanged(order.Id, order.Status.ToString());

        // Send notification to specific user
        await _hubContext.Clients
            .User(order.UserId)
            .ReceiveNotification(new NotificationDto(
                Id: Guid.NewGuid().ToString(),
                Title: "Order Update",
                Message: $"Your order {order.Id} is now being processed.",
                Severity: "info",
                Timestamp: DateTime.UtcNow));

        _logger.LogInformation("Order {OrderId} status pushed to clients", order.Id);
    }
}

// Background worker sending periodic updates
public class DashboardUpdateWorker : BackgroundService
{
    private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;
    private readonly IServiceScopeFactory _scopeFactory;

    public DashboardUpdateWorker(
        IHubContext<NotificationHub, INotificationClient> hubContext,
        IServiceScopeFactory scopeFactory)
    {
        _hubContext = hubContext;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var statsService = scope.ServiceProvider.GetRequiredService<IStatsService>();
            var stats = await statsService.GetDashboardStatsAsync();

            await _hubContext.Clients.All.ReceiveNotification(new NotificationDto(
                Id: Guid.NewGuid().ToString(),
                Title: "Dashboard Update",
                Message: $"Active orders: {stats.ActiveOrders}",
                Severity: "info",
                Timestamp: DateTime.UtcNow));

            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }
}
```

## Streaming from Server to Client

Stream data from the server to the client using `IAsyncEnumerable<T>`.

```csharp
using Microsoft.AspNetCore.SignalR;
using System.Runtime.CompilerServices;

namespace MyApp.Hubs;

public class DataStreamHub : Hub
{
    private readonly IStockPriceService _stockService;

    public DataStreamHub(IStockPriceService stockService)
    {
        _stockService = stockService;
    }

    public async IAsyncEnumerable<StockPrice> StreamStockPrices(
        string[] symbols,
        int intervalMs = 1000,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            foreach (var symbol in symbols)
            {
                var price = await _stockService.GetCurrentPriceAsync(symbol);
                yield return new StockPrice(symbol, price, DateTime.UtcNow);
            }

            await Task.Delay(intervalMs, cancellationToken);
        }
    }

    public async Task<ChannelReader<LogEntry>> StreamLogs(
        string application,
        CancellationToken cancellationToken)
    {
        var channel = Channel.CreateUnbounded<LogEntry>();

        _ = WriteLogEntries(channel.Writer, application, cancellationToken);

        return channel.Reader;
    }

    private async Task WriteLogEntries(
        ChannelWriter<LogEntry> writer,
        string application,
        CancellationToken cancellationToken)
    {
        try
        {
            await foreach (var entry in _logService.GetLogStreamAsync(application, cancellationToken))
            {
                await writer.WriteAsync(entry, cancellationToken);
            }
        }
        finally
        {
            writer.Complete();
        }
    }
}

public record StockPrice(string Symbol, decimal Price, DateTime Timestamp);
public record LogEntry(string Level, string Message, DateTime Timestamp);
```

## SignalR vs Other Real-Time Technologies

| Feature | SignalR | WebSocket (raw) | gRPC Streaming | Server-Sent Events |
|---|---|---|---|---|
| Transport | WebSocket, SSE, Long Poll | WebSocket only | HTTP/2 | HTTP/1.1 |
| Fallback | Automatic transport negotiation | None | None | None |
| Direction | Bidirectional | Bidirectional | Uni/bidirectional | Server-to-client |
| Groups | Built-in | Manual | Not built-in | Not built-in |
| Scale-out | Redis, Azure SignalR, SQL | Custom | Load balancer | Custom |
| Auth | ASP.NET Core integrated | Manual | ASP.NET Core integrated | Cookie/header |
| Serialization | JSON, MessagePack | Manual | Protobuf | Text |
| Client libraries | .NET, JS, Java | Browser API | .NET, Go, Java | Browser API |

## Best Practices

1. **Use strongly-typed hubs by implementing `Hub<T>` with an interface** (e.g., `Hub<INotificationClient>`) instead of `Hub` with string-based `SendAsync("MethodName")` calls, so that client method invocations are checked at compile time and refactoring client method names does not silently break real-time messaging.

2. **Use `IHubContext<THub, T>` to send messages from services, controllers, and background workers** rather than storing hub references or static connection lists, because `IHubContext` is managed by the DI container and works correctly across the application's lifetime regardless of hub instance creation and disposal.

3. **Use groups for topic-based messaging** (`Groups.AddToGroupAsync(connectionId, "order-123")`) rather than maintaining manual dictionaries of connection IDs, because SignalR manages group membership across reconnections and server restarts when using a backplane like Redis.

4. **Forward JWT tokens via query string for WebSocket connections** by handling `JwtBearerEvents.OnMessageReceived` and extracting the token from `context.Request.Query["access_token"]`, because browsers cannot set custom headers on WebSocket upgrade requests and the standard `Authorization` header is unavailable.

5. **Configure `MaximumReceiveMessageSize` to a reasonable limit** (e.g., 64 KB for chat, 1 MB for file metadata) rather than relying on the default, because unbounded message sizes allow clients to send arbitrarily large payloads that consume server memory and can be used for denial-of-service.

6. **Add a Redis backplane with `.AddStackExchangeRedis()` for multi-server deployments** so that messages sent from one server reach clients connected to other servers; without a backplane, `Clients.All` only reaches clients connected to the same server instance.

7. **Use `IAsyncEnumerable<T>` for server-to-client streaming** of continuous data (stock prices, log tails, progress updates) instead of sending frequent individual messages, because streaming uses a single long-lived channel that is more efficient than repeated hub method invocations.

8. **Set `KeepAliveInterval` and `ClientTimeoutInterval`** to values appropriate for your network conditions (e.g., 15s keep-alive, 30s timeout for low-latency networks; 30s/60s for mobile), because the defaults may be too aggressive for clients on unreliable connections, causing unnecessary reconnections.

9. **Keep hub methods thin** by delegating business logic to injected services and using the hub only for message routing, because hub instances are transient (created per invocation) and should not hold state between method calls; store per-connection state in a concurrent dictionary keyed by `Context.ConnectionId`.

10. **Handle `OnDisconnectedAsync` to clean up resources** (remove from custom tracking, update online presence, release locks) and log the disconnect reason from the `exception` parameter, because clients disconnect without explicit notification when they close the browser, lose network, or the process crashes.
