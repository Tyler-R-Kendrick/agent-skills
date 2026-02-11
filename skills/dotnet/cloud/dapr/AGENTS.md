# Dapr

## Overview
Dapr is a portable, event-driven runtime for building resilient, stateless and stateful microservices. It provides building blocks as HTTP/gRPC APIs that any language can consume, with first-class .NET SDK support via `Dapr.Client` and `Dapr.AspNetCore`.

## NuGet Packages
- `Dapr.Client` — core DaprClient for service invocation, state, pub/sub, bindings, secrets
- `Dapr.AspNetCore` — ASP.NET Core integration (subscriber endpoints, middleware)
- `Dapr.Actors` / `Dapr.Actors.AspNetCore` — virtual actor model

## Setup
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDaprClient();

var app = builder.Build();
app.UseCloudEvents();
app.MapSubscribeHandler();
app.Run();
```

## Service Invocation
```csharp
var client = new DaprClientBuilder().Build();

var data = new { id = "17", amount = 99m };
var account = await client.InvokeMethodAsync<object, Account>(
    "order-service", "deposit", data);
```

## State Management
```csharp
await client.SaveStateAsync("statestore", "order-1", order);
var saved = await client.GetStateAsync<Order>("statestore", "order-1");
await client.DeleteStateAsync("statestore", "order-1");
```

## Pub/Sub
### Publish
```csharp
await client.PublishEventAsync("pubsub", "orders", new { Id = "17", Amount = 10m });
```
### Subscribe
```csharp
app.MapPost("/orders", [Topic("pubsub", "orders")] (Order order) =>
{
    Console.WriteLine($"Received order: {order.Id}");
    return Results.Ok();
});
```

## Bindings
```csharp
await client.InvokeBindingAsync("send-email", "create", new
{
    metadata = new { emailTo = "user@example.com", subject = "Hello" },
    data = "<h1>Message from Dapr</h1>"
});
```

## Actors
```csharp
// Define actor interface
public interface IOrderActor : IActor
{
    Task<Order> GetOrderAsync();
    Task SubmitOrderAsync(Order order);
}

// Implement actor
public class OrderActor : Actor, IOrderActor
{
    public OrderActor(ActorHost host) : base(host) { }

    public async Task SubmitOrderAsync(Order order)
    {
        await StateManager.SetStateAsync("order", order);
    }

    public Task<Order> GetOrderAsync()
    {
        return StateManager.GetStateAsync<Order>("order");
    }
}

// Register in Program.cs
builder.Services.AddActors(options =>
{
    options.Actors.RegisterActor<OrderActor>();
});
```

## Secrets
```csharp
var secret = await client.GetSecretAsync("secret-store", "my-secret");
string value = secret["my-secret"];
```

## Best Practices
- Use the sidecar architecture — never embed Dapr in-process.
- Rely on component YAML files to configure state stores, pub/sub brokers, and bindings without changing application code.
- Use `DaprClient` from DI (`builder.Services.AddDaprClient()`) rather than constructing manually.
- Prefer the `[Topic]` attribute on ASP.NET endpoints for declarative pub/sub subscriptions.
- Keep actors lightweight; use them for per-entity stateful logic, not bulk data processing.
- Use Dapr's built-in resiliency policies (retries, timeouts, circuit breakers) configured via YAML rather than application-level resilience.
- Test locally with `dapr run -- dotnet run` and the Dapr CLI.
