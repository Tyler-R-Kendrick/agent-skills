---
name: azure-functions
description: |
  Use when building serverless event-driven applications with Azure Functions in .NET. Covers the isolated worker model, HTTP/Timer/Queue/Blob triggers, dependency injection, Durable Functions orchestration, and deployment.
  USE FOR: serverless HTTP APIs, event-driven processing (queues, blobs, timers), Durable Functions for long-running workflows, lightweight microservices without infrastructure management, scheduled background jobs
  DO NOT USE FOR: always-on web applications with WebSockets (use ASP.NET Core), complex multi-service orchestration with service discovery (use aspire), long-running compute without orchestration (use Azure Container Apps), Dapr-based microservices (use dapr)
license: MIT
metadata:
  displayName: "Azure Functions"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "Azure Functions Documentation"
    url: "https://learn.microsoft.com/azure/azure-functions"
  - title: "Azure Functions .NET Worker GitHub Repository"
    url: "https://github.com/Azure/azure-functions-dotnet-worker"
  - title: "Microsoft.Azure.Functions.Worker NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker"
---

# Azure Functions

## Overview
Azure Functions is a serverless compute platform that lets you run event-driven code without managing infrastructure. The .NET isolated worker model (recommended for .NET 8+) runs functions in a separate process with full control over the host, middleware pipeline, and dependency injection. Functions can be triggered by HTTP requests, timers, queues, blobs, Event Hubs, and more.

## NuGet Packages
```bash
dotnet add package Microsoft.Azure.Functions.Worker
dotnet add package Microsoft.Azure.Functions.Worker.Sdk
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Http.AspNetCore
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Timer
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.DurableTask
```

## Project Setup (Isolated Worker Model)
```csharp
// Program.cs
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        // Register your services
        services.AddHttpClient();
        services.AddSingleton<IOrderService, OrderService>();
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                Environment.GetEnvironmentVariable("SqlConnectionString")));
    })
    .Build();

host.Run();
```

## HTTP Trigger
```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class OrderFunctions(IOrderService orderService, ILogger<OrderFunctions> logger)
{
    [Function("GetOrders")]
    public async Task<IActionResult> GetOrders(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "orders")] HttpRequest req)
    {
        logger.LogInformation("Getting all orders");
        var orders = await orderService.GetAllAsync();
        return new OkObjectResult(orders);
    }

    [Function("GetOrderById")]
    public async Task<IActionResult> GetOrderById(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "orders/{id:int}")] HttpRequest req,
        int id)
    {
        var order = await orderService.GetByIdAsync(id);
        return order is null
            ? new NotFoundResult()
            : new OkObjectResult(order);
    }

    [Function("CreateOrder")]
    public async Task<IActionResult> CreateOrder(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "orders")] HttpRequest req)
    {
        var order = await req.ReadFromJsonAsync<CreateOrderRequest>();
        if (order is null)
            return new BadRequestObjectResult("Invalid order data");

        var created = await orderService.CreateAsync(order);
        return new CreatedResult($"/api/orders/{created.Id}", created);
    }
}
```

## Timer Trigger
```csharp
public class ScheduledFunctions(ILogger<ScheduledFunctions> logger)
{
    // Runs every 5 minutes
    [Function("CleanupExpiredSessions")]
    public async Task CleanupExpiredSessions(
        [TimerTrigger("0 */5 * * * *")] TimerInfo timer)
    {
        logger.LogInformation("Cleanup started at: {Time}", DateTime.UtcNow);

        if (timer.ScheduleStatus is not null)
        {
            logger.LogInformation("Next occurrence: {Next}", timer.ScheduleStatus.Next);
        }

        // Cleanup logic here
        await Task.CompletedTask;
    }

    // Runs daily at 2:00 AM UTC
    [Function("DailyReport")]
    public async Task GenerateDailyReport(
        [TimerTrigger("0 0 2 * * *")] TimerInfo timer)
    {
        logger.LogInformation("Generating daily report");
        await Task.CompletedTask;
    }
}
```

## Queue Trigger and Output
```csharp
public class QueueFunctions(IOrderService orderService, ILogger<QueueFunctions> logger)
{
    [Function("ProcessOrder")]
    [QueueOutput("order-notifications")]
    public async Task<string> ProcessOrder(
        [QueueTrigger("incoming-orders")] string orderJson)
    {
        var order = JsonSerializer.Deserialize<Order>(orderJson)!;
        logger.LogInformation("Processing order: {OrderId}", order.Id);

        await orderService.ProcessAsync(order);

        // Return value is sent to the output queue
        return JsonSerializer.Serialize(new
        {
            orderId = order.Id,
            status = "processed",
            timestamp = DateTime.UtcNow
        });
    }
}

// Multiple outputs
public class MultiOutputFunction
{
    [Function("ProcessAndNotify")]
    public async Task<MultiOutput> ProcessAndNotify(
        [QueueTrigger("work-items")] WorkItem item)
    {
        return new MultiOutput
        {
            CompletedItem = JsonSerializer.Serialize(new { item.Id, Status = "done" }),
            NotificationMessage = $"Work item {item.Id} completed"
        };
    }
}

public class MultiOutput
{
    [QueueOutput("completed-items")]
    public string CompletedItem { get; set; } = "";

    [QueueOutput("notifications")]
    public string NotificationMessage { get; set; } = "";
}
```

## Blob Trigger
```csharp
public class BlobFunctions(ILogger<BlobFunctions> logger)
{
    [Function("ProcessUploadedImage")]
    [BlobOutput("thumbnails/{name}", Connection = "StorageConnection")]
    public async Task<byte[]> ProcessUploadedImage(
        [BlobTrigger("uploads/{name}", Connection = "StorageConnection")] Stream inputBlob,
        string name)
    {
        logger.LogInformation("Processing blob: {Name}, Size: {Size}", name, inputBlob.Length);

        using var image = await Image.LoadAsync(inputBlob);
        image.Mutate(x => x.Resize(150, 150));

        using var outputStream = new MemoryStream();
        await image.SaveAsJpegAsync(outputStream);
        return outputStream.ToArray();
    }
}
```

## Trigger Types

| Trigger | Package | Cron/Schedule |
|---------|---------|--------------|
| HTTP | `Extensions.Http.AspNetCore` | On-demand |
| Timer | `Extensions.Timer` | `0 */5 * * * *` (every 5 min) |
| Queue | `Extensions.Storage.Queues` | Message arrival |
| Blob | `Extensions.Storage.Blobs` | Blob creation/update |
| Event Hub | `Extensions.EventHubs` | Event arrival |
| Service Bus | `Extensions.ServiceBus` | Message arrival |
| Cosmos DB | `Extensions.CosmosDB` | Document change |

## Durable Functions (Orchestration)
```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.DurableTask;
using Microsoft.DurableTask.Client;

public class OrderOrchestration
{
    [Function("OrderWorkflow")]
    public static async Task<OrderResult> RunOrchestrator(
        [OrchestrationTrigger] TaskOrchestrationContext context)
    {
        var order = context.GetInput<Order>()!;

        // Step 1: Validate inventory
        var isAvailable = await context.CallActivityAsync<bool>(
            "CheckInventory", order);

        if (!isAvailable)
            return new OrderResult(order.Id, "Failed", "Out of stock");

        // Step 2: Process payment
        var paymentResult = await context.CallActivityAsync<PaymentResult>(
            "ProcessPayment", order);

        if (!paymentResult.Success)
            return new OrderResult(order.Id, "Failed", paymentResult.Error);

        // Step 3: Ship order
        var trackingNumber = await context.CallActivityAsync<string>(
            "ShipOrder", order);

        // Step 4: Send confirmation
        await context.CallActivityAsync("SendConfirmation", new
        {
            order.Id,
            order.CustomerEmail,
            trackingNumber
        });

        return new OrderResult(order.Id, "Completed", trackingNumber);
    }

    [Function("CheckInventory")]
    public static async Task<bool> CheckInventory(
        [ActivityTrigger] Order order, ILogger logger)
    {
        logger.LogInformation("Checking inventory for order {OrderId}", order.Id);
        // Check inventory logic
        return true;
    }

    [Function("ProcessPayment")]
    public static async Task<PaymentResult> ProcessPayment(
        [ActivityTrigger] Order order)
    {
        // Payment processing logic
        return new PaymentResult(true, null);
    }

    [Function("ShipOrder")]
    public static async Task<string> ShipOrder(
        [ActivityTrigger] Order order)
    {
        // Shipping logic
        return $"TRACK-{Guid.NewGuid():N}"[..16];
    }

    [Function("SendConfirmation")]
    public static Task SendConfirmation(
        [ActivityTrigger] dynamic details, ILogger logger)
    {
        logger.LogInformation("Sending confirmation for order {OrderId}", (string)details.Id);
        return Task.CompletedTask;
    }

    // HTTP trigger to start the orchestration
    [Function("StartOrderWorkflow")]
    public static async Task<IActionResult> StartOrderWorkflow(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req,
        [DurableClient] DurableTaskClient client)
    {
        var order = await req.ReadFromJsonAsync<Order>();
        var instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
            "OrderWorkflow", order);

        return new AcceptedResult($"/api/status/{instanceId}", new { instanceId });
    }
}

record OrderResult(int Id, string Status, string? Details);
record PaymentResult(bool Success, string? Error);
```

## Middleware
```csharp
var host = new HostBuilder()
    .ConfigureFunctionsWebApplication(worker =>
    {
        worker.UseMiddleware<ExceptionHandlingMiddleware>();
        worker.UseMiddleware<CorrelationIdMiddleware>();
    })
    .Build();

public class ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
    : IFunctionsWorkerMiddleware
{
    public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception in {Function}", context.FunctionDefinition.Name);
            throw;
        }
    }
}
```

## local.settings.json
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "SqlConnectionString": "Server=localhost;Database=myapp;Trusted_Connection=true;"
  }
}
```

## Best Practices
- Use the isolated worker model (`ConfigureFunctionsWebApplication`) for all new .NET 8+ projects; the in-process model is deprecated and does not support .NET 8+.
- Register services in `ConfigureServices` and use constructor injection in function classes rather than creating instances manually; function classes support the same DI patterns as ASP.NET Core controllers.
- Use `AuthorizationLevel.Function` for API endpoints that need key-based access control, and `AuthorizationLevel.Anonymous` only for public endpoints or when using a reverse proxy (API Management, Front Door) that handles auth.
- Set `Route = "orders/{id:int}"` on HTTP triggers with route constraints to get type-safe parameter binding and clear URL patterns rather than parsing query strings manually.
- Use Durable Functions (`OrchestrationTrigger` + `ActivityTrigger`) for multi-step workflows that need reliable execution, rather than chaining queue messages between separate functions.
- Keep function execution time under 5 minutes on the Consumption plan; use the Premium or Dedicated plan for longer-running functions, and Durable Functions for workflows that span hours or days.
- Store connection strings and secrets in `local.settings.json` for local development and in Azure Application Settings (or Key Vault references) for production; never commit `local.settings.json` to source control.
- Use `[QueueOutput]` and `[BlobOutput]` attributes for output bindings rather than creating SDK clients manually, which reduces boilerplate and leverages the runtime's connection management.
- Add Application Insights with `AddApplicationInsightsTelemetryWorkerService()` to get automatic request tracking, dependency tracking, and exception logging without manual instrumentation.
- Test functions by creating instances of your function class directly and passing mock services through constructor injection; use `HttpRequestData` or test doubles for trigger inputs.
