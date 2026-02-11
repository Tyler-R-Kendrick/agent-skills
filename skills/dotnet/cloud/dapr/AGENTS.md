# Dapr

## Overview
Dapr (Distributed Application Runtime) is a portable, event-driven runtime for building resilient microservices. It provides language-agnostic building blocks as HTTP/gRPC APIs that run alongside your application as a sidecar process. The .NET SDK (`Dapr.Client`, `Dapr.AspNetCore`) provides strongly-typed clients for service invocation, state management, pub/sub, bindings, actors, and secrets with pluggable component infrastructure configured via YAML.

## NuGet Packages
```bash
dotnet add package Dapr.Client                    # Core DaprClient
dotnet add package Dapr.AspNetCore                # ASP.NET Core integration
dotnet add package Dapr.Actors                    # Virtual actor model
dotnet add package Dapr.Actors.AspNetCore          # Actor hosting in ASP.NET Core
dotnet add package Dapr.Extensions.Configuration  # Configuration provider
```

## Setup
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDaprClient();
builder.Services.AddControllers().AddDapr();

var app = builder.Build();

app.UseCloudEvents();
app.MapSubscribeHandler();
app.MapControllers();
app.Run();
```

## Service Invocation
Call methods on other services by name without knowing their network address. Dapr handles service discovery, mTLS, retries, and load balancing.

```csharp
using Dapr.Client;

public class OrderService(DaprClient daprClient, ILogger<OrderService> logger)
{
    public async Task<OrderConfirmation> PlaceOrderAsync(Order order)
    {
        logger.LogInformation("Placing order {OrderId}", order.Id);

        // Invoke a method on the "inventory-service"
        var available = await daprClient.InvokeMethodAsync<Order, InventoryCheck>(
            appId: "inventory-service",
            methodName: "check-stock",
            data: order);

        if (!available.InStock)
            throw new InvalidOperationException($"Item {order.ProductId} is out of stock");

        // Invoke payment service
        var payment = await daprClient.InvokeMethodAsync<PaymentRequest, PaymentResult>(
            appId: "payment-service",
            methodName: "process",
            data: new PaymentRequest(order.Id, order.Total));

        return new OrderConfirmation(order.Id, payment.TransactionId, DateTime.UtcNow);
    }
}

// HTTP verb-specific invocation
public async Task<Product> GetProductAsync(string productId)
{
    var request = daprClient.CreateInvokeMethodRequest(
        HttpMethod.Get, "catalog-service", $"products/{productId}");

    return await daprClient.InvokeMethodAsync<Product>(request);
}
```

## State Management
Store and retrieve state using pluggable backends (Redis, CosmosDB, PostgreSQL, etc.) configured in component YAML.

```csharp
public class CartService(DaprClient daprClient)
{
    private const string StoreName = "statestore";

    public async Task AddItemAsync(string userId, CartItem item)
    {
        var cart = await daprClient.GetStateAsync<Cart>(StoreName, $"cart-{userId}")
            ?? new Cart(userId);

        cart.Items.Add(item);
        cart.UpdatedAt = DateTime.UtcNow;

        await daprClient.SaveStateAsync(StoreName, $"cart-{userId}", cart);
    }

    public async Task<Cart?> GetCartAsync(string userId)
    {
        return await daprClient.GetStateAsync<Cart>(StoreName, $"cart-{userId}");
    }

    public async Task ClearCartAsync(string userId)
    {
        await daprClient.DeleteStateAsync(StoreName, $"cart-{userId}");
    }

    // Optimistic concurrency with ETags
    public async Task<bool> TryUpdateCartAsync(string userId, Cart updatedCart)
    {
        var (cart, etag) = await daprClient.GetStateAndETagAsync<Cart>(
            StoreName, $"cart-{userId}");

        updatedCart.UpdatedAt = DateTime.UtcNow;

        return await daprClient.TrySaveStateAsync(
            StoreName, $"cart-{userId}", updatedCart, etag);
    }

    // Bulk state operations
    public async Task<IReadOnlyList<Cart>> GetCartsAsync(params string[] userIds)
    {
        var keys = userIds.Select(id => $"cart-{id}").ToList();
        var items = await daprClient.GetBulkStateAsync(StoreName, keys, parallelism: 5);
        return items
            .Where(i => i.Value is not null)
            .Select(i => JsonSerializer.Deserialize<Cart>(i.Value)!)
            .ToList();
    }
}

public record Cart(string UserId)
{
    public List<CartItem> Items { get; init; } = new();
    public DateTime UpdatedAt { get; set; }
}

public record CartItem(string ProductId, string Name, decimal Price, int Quantity);
```

## Pub/Sub Messaging

### Publishing Events
```csharp
public class OrderProcessor(DaprClient daprClient, ILogger<OrderProcessor> logger)
{
    public async Task CompleteOrderAsync(Order order)
    {
        // Process the order...
        logger.LogInformation("Order {OrderId} completed", order.Id);

        // Publish event to other services
        await daprClient.PublishEventAsync("pubsub", "order-completed", new OrderCompletedEvent
        {
            OrderId = order.Id,
            CustomerId = order.CustomerId,
            Total = order.Total,
            CompletedAt = DateTime.UtcNow
        });
    }
}

public record OrderCompletedEvent
{
    public int OrderId { get; init; }
    public string CustomerId { get; init; } = "";
    public decimal Total { get; init; }
    public DateTime CompletedAt { get; init; }
}
```

### Subscribing to Events
```csharp
using Dapr;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class NotificationController(ILogger<NotificationController> logger) : ControllerBase
{
    [Topic("pubsub", "order-completed")]
    [HttpPost("order-completed")]
    public async Task<IActionResult> HandleOrderCompleted(OrderCompletedEvent evt)
    {
        logger.LogInformation(
            "Sending notification for order {OrderId}, total: {Total}",
            evt.OrderId, evt.Total);

        // Send email, SMS, push notification, etc.
        await SendNotificationAsync(evt);

        return Ok();
    }
}

// Minimal API subscription
app.MapPost("/events/order-completed",
    [Topic("pubsub", "order-completed")] (OrderCompletedEvent evt) =>
    {
        Console.WriteLine($"Order {evt.OrderId} completed at {evt.CompletedAt}");
        return Results.Ok();
    });
```

## Output Bindings
```csharp
public class NotificationService(DaprClient daprClient)
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        await daprClient.InvokeBindingAsync("send-email", "create", new
        {
            metadata = new Dictionary<string, string>
            {
                ["emailTo"] = to,
                ["subject"] = subject
            },
            data = body
        });
    }

    public async Task SendToQueueAsync<T>(string bindingName, T data)
    {
        await daprClient.InvokeBindingAsync(bindingName, "create", data);
    }
}
```

## Actors
Virtual actors provide a single-threaded programming model for per-entity stateful logic.

```csharp
using Dapr.Actors;
using Dapr.Actors.Runtime;

// Define actor interface
public interface IOrderActor : IActor
{
    Task<OrderState> GetStateAsync();
    Task SubmitAsync(Order order);
    Task ApproveAsync();
    Task CancelAsync(string reason);
}

// Implement actor
public class OrderActor : Actor, IOrderActor, IRemindable
{
    private const string StateName = "order-state";

    public OrderActor(ActorHost host) : base(host) { }

    public async Task<OrderState> GetStateAsync()
    {
        return await StateManager.GetStateAsync<OrderState>(StateName);
    }

    public async Task SubmitAsync(Order order)
    {
        var state = new OrderState
        {
            OrderId = order.Id,
            Status = "Submitted",
            Items = order.Items,
            Total = order.Total,
            SubmittedAt = DateTime.UtcNow
        };

        await StateManager.SetStateAsync(StateName, state);

        // Set a reminder for order expiration (30 minutes)
        await RegisterReminderAsync("expire-order",
            null, TimeSpan.FromMinutes(30), TimeSpan.FromMilliseconds(-1));
    }

    public async Task ApproveAsync()
    {
        var state = await StateManager.GetStateAsync<OrderState>(StateName);
        state.Status = "Approved";
        state.ApprovedAt = DateTime.UtcNow;
        await StateManager.SetStateAsync(StateName, state);
        await UnregisterReminderAsync("expire-order");
    }

    public async Task CancelAsync(string reason)
    {
        var state = await StateManager.GetStateAsync<OrderState>(StateName);
        state.Status = "Cancelled";
        state.CancellationReason = reason;
        await StateManager.SetStateAsync(StateName, state);
        await UnregisterReminderAsync("expire-order");
    }

    public async Task ReceiveReminderAsync(string reminderName, byte[] state,
        TimeSpan dueTime, TimeSpan period)
    {
        if (reminderName == "expire-order")
        {
            await CancelAsync("Order expired after 30 minutes");
        }
    }
}

// Register actors in Program.cs
builder.Services.AddActors(options =>
{
    options.Actors.RegisterActor<OrderActor>();
});

app.MapActorsHandlers();

// Use actors from a client
public class OrderController(IActorProxyFactory actorProxy) : ControllerBase
{
    [HttpPost("orders/{orderId}/submit")]
    public async Task<IActionResult> SubmitOrder(string orderId, Order order)
    {
        var actor = actorProxy.CreateActorProxy<IOrderActor>(
            new ActorId(orderId), "OrderActor");

        await actor.SubmitAsync(order);
        return Accepted();
    }

    [HttpGet("orders/{orderId}")]
    public async Task<IActionResult> GetOrder(string orderId)
    {
        var actor = actorProxy.CreateActorProxy<IOrderActor>(
            new ActorId(orderId), "OrderActor");

        var state = await actor.GetStateAsync();
        return Ok(state);
    }
}
```

## Secrets
```csharp
public class ConfigService(DaprClient daprClient)
{
    public async Task<string> GetSecretAsync(string key)
    {
        var secret = await daprClient.GetSecretAsync("secret-store", key);
        return secret[key];
    }

    public async Task<Dictionary<string, string>> GetBulkSecretsAsync()
    {
        var secrets = await daprClient.GetBulkSecretAsync("secret-store");
        return secrets.ToDictionary(s => s.Key, s => s.Value.First().Value);
    }
}
```

## Component YAML Examples
```yaml
# statestore.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  version: v1
  metadata:
  - name: redisHost
    value: localhost:6379
  - name: redisPassword
    value: ""
```

```yaml
# pubsub.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: pubsub
spec:
  type: pubsub.redis
  version: v1
  metadata:
  - name: redisHost
    value: localhost:6379
```

## Local Development
```bash
# Run with Dapr sidecar
dapr run --app-id order-service --app-port 5000 -- dotnet run

# Run multiple services
dapr run --app-id order-service --app-port 5000 --dapr-http-port 3500 -- dotnet run --project OrderService
dapr run --app-id inventory-service --app-port 5001 --dapr-http-port 3501 -- dotnet run --project InventoryService
```

## Best Practices
- Use the Dapr sidecar architecture exclusively; never embed Dapr functionality in-process because the sidecar handles mTLS, retries, and component lifecycle independently of your application code.
- Inject `DaprClient` from DI via `builder.Services.AddDaprClient()` rather than constructing it with `new DaprClientBuilder().Build()`, to ensure consistent configuration and proper lifetime management.
- Configure state stores, pub/sub brokers, and bindings via component YAML files rather than hardcoding infrastructure details in application code, enabling environment-specific configuration without code changes.
- Use `GetStateAndETagAsync` with `TrySaveStateAsync` for optimistic concurrency on state operations that may conflict, rather than blind `SaveStateAsync` which silently overwrites concurrent changes.
- Prefer the `[Topic("pubsub", "topic-name")]` attribute on ASP.NET controller endpoints for declarative pub/sub subscriptions rather than programmatic subscription, which is harder to discover and test.
- Keep actors lightweight and focused on single-entity state management; avoid actors for bulk data processing or fan-out operations that are better suited to pub/sub or batch processing patterns.
- Use Dapr's built-in resiliency policies (retries, timeouts, circuit breakers) configured via YAML rather than implementing application-level resilience with Polly, to keep resilience concerns out of application code.
- Test service invocation locally with `dapr run -- dotnet run` and verify component configurations with `dapr components -k` before deploying to Kubernetes or Azure Container Apps.
- Use `InvokeMethodAsync<TRequest, TResponse>` with strongly-typed generic parameters rather than working with raw HTTP responses, to get automatic serialization and type safety.
- Store secrets in a Dapr secret store component (Azure Key Vault, HashiCorp Vault, local file) and access them via `DaprClient.GetSecretAsync` rather than reading environment variables directly, to centralize secret management across services.
