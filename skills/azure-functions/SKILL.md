---
name: azure-functions
description: Guidance for building serverless Azure Functions in .NET. Use when working with Azure Functions.
license: MIT
metadata:
  displayName: "Azure Functions"
  author: "Tyler-R-Kendrick"
---

# Azure Functions

## Overview
Azure Functions is a serverless compute service for running event-driven code without managing infrastructure. Supports HTTP triggers, timers, queues, and more.

## Installation

```bash
dotnet new install Microsoft.Azure.Functions.Worker.ProjectTemplates
dotnet new func -n MyFunctionApp
cd MyFunctionApp
dotnet add package Microsoft.Azure.Functions.Worker
dotnet add package Microsoft.Azure.Functions.Worker.Sdk
```

## HTTP Trigger

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

public class HttpTriggerFunction
{
    private readonly ILogger<HttpTriggerFunction> _logger;
    
    public HttpTriggerFunction(ILogger<HttpTriggerFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("HttpTrigger")]
    public HttpResponseData Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
    {
        _logger.LogInformation("Processing HTTP request");
        
        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        response.Headers.Add("Content-Type", "application/json");
        response.WriteString("{\"message\": \"Hello from Azure Functions\"}");
        
        return response;
    }
}
```

## Timer Trigger

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class TimerTriggerFunction
{
    private readonly ILogger<TimerTriggerFunction> _logger;
    
    public TimerTriggerFunction(ILogger<TimerTriggerFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("TimerTrigger")]
    public void Run([TimerTrigger("0 */5 * * * *")] TimerInfo timerInfo)
    {
        _logger.LogInformation($"Function executed at: {DateTime.UtcNow}");
        
        if (timerInfo.ScheduleStatus is not null)
        {
            _logger.LogInformation($"Next timer schedule: {timerInfo.ScheduleStatus.Next}");
        }
    }
}
```

## Queue Trigger

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class QueueTriggerFunction
{
    private readonly ILogger<QueueTriggerFunction> _logger;
    
    public QueueTriggerFunction(ILogger<QueueTriggerFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("QueueTrigger")]
    public void Run(
        [QueueTrigger("myqueue", Connection = "AzureWebJobsStorage")] string message)
    {
        _logger.LogInformation($"Processing queue message: {message}");
    }
}
```

## Blob Trigger

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class BlobTriggerFunction
{
    private readonly ILogger<BlobTriggerFunction> _logger;
    
    public BlobTriggerFunction(ILogger<BlobTriggerFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("BlobTrigger")]
    public void Run(
        [BlobTrigger("mycontainer/{name}", Connection = "AzureWebJobsStorage")] string content,
        string name)
    {
        _logger.LogInformation($"Processing blob: {name}");
        _logger.LogInformation($"Content length: {content.Length}");
    }
}
```

## Service Bus Trigger

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class ServiceBusTriggerFunction
{
    private readonly ILogger<ServiceBusTriggerFunction> _logger;
    
    public ServiceBusTriggerFunction(ILogger<ServiceBusTriggerFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("ServiceBusTrigger")]
    public void Run(
        [ServiceBusTrigger("myqueue", Connection = "ServiceBusConnection")] string message)
    {
        _logger.LogInformation($"Processing Service Bus message: {message}");
    }
}
```

## Output Bindings

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

public class OutputBindingFunction
{
    [Function("OutputBinding")]
    [QueueOutput("outputqueue", Connection = "AzureWebJobsStorage")]
    public string Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
    {
        var message = "Message to queue";
        return message; // Automatically written to queue
    }
}
```

## Multiple Output Bindings

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

public class MultipleOutputsFunction
{
    [Function("MultipleOutputs")]
    public MultipleOutputs Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
    {
        return new MultipleOutputs
        {
            QueueMessage = "Queue message",
            BlobContent = "Blob content",
            HttpResponse = req.CreateResponse(System.Net.HttpStatusCode.OK)
        };
    }
}

public class MultipleOutputs
{
    [QueueOutput("myqueue", Connection = "AzureWebJobsStorage")]
    public string QueueMessage { get; set; }
    
    [BlobOutput("mycontainer/output.txt", Connection = "AzureWebJobsStorage")]
    public string BlobContent { get; set; }
    
    public HttpResponseData HttpResponse { get; set; }
}
```

## Dependency Injection

Configure services in `Program.cs`.

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        
        services.AddSingleton<IMyService, MyService>();
        services.AddHttpClient<IApiClient, ApiClient>();
    })
    .Build();

await host.RunAsync();
```

Use DI in functions:

```csharp
public class DependencyInjectionFunction
{
    private readonly IMyService _myService;
    
    public DependencyInjectionFunction(IMyService myService)
    {
        _myService = myService;
    }
    
    [Function("DIFunction")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
    {
        var result = await _myService.ProcessAsync();
        
        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteAsJsonAsync(result);
        return response;
    }
}
```

## Configuration

Use `local.settings.json` for local development:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "ServiceBusConnection": "Endpoint=sb://...",
    "MyCustomSetting": "value"
  }
}
```

Access configuration:

```csharp
using Microsoft.Extensions.Configuration;

public class ConfigFunction
{
    private readonly IConfiguration _configuration;
    
    public ConfigFunction(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    [Function("ConfigFunction")]
    public void Run([TimerTrigger("0 */5 * * * *")] TimerInfo timer)
    {
        var setting = _configuration["MyCustomSetting"];
    }
}
```

## Durable Functions

Orchestrate long-running workflows.

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.DurableTask;

public class DurableOrchestration
{
    [Function("Orchestrator")]
    public async Task<string> RunOrchestrator(
        [OrchestrationTrigger] TaskOrchestrationContext context)
    {
        var result1 = await context.CallActivityAsync<string>("Activity1", "input1");
        var result2 = await context.CallActivityAsync<string>("Activity2", result1);
        var result3 = await context.CallActivityAsync<string>("Activity3", result2);
        
        return result3;
    }
    
    [Function("Activity1")]
    public string Activity1([ActivityTrigger] string input)
    {
        return $"Processed: {input}";
    }
    
    [Function("StartOrchestration")]
    public async Task<HttpResponseData> Start(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req,
        [DurableClient] DurableTaskClient client)
    {
        var instanceId = await client.ScheduleNewOrchestrationInstanceAsync("Orchestrator");
        
        var response = req.CreateResponse(System.Net.HttpStatusCode.Accepted);
        await response.WriteAsJsonAsync(new { instanceId });
        return response;
    }
}
```

## Error Handling

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public class ErrorHandlingFunction
{
    private readonly ILogger<ErrorHandlingFunction> _logger;
    
    public ErrorHandlingFunction(ILogger<ErrorHandlingFunction> logger)
    {
        _logger = logger;
    }
    
    [Function("ErrorHandling")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
    {
        try
        {
            var result = await ProcessAsync();
            
            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(result);
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing request");
            
            var errorResponse = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
            await errorResponse.WriteAsJsonAsync(new { error = "Internal server error" });
            return errorResponse;
        }
    }
}
```

## Guidance

- Use isolated worker process model for .NET 8+.
- Inject dependencies through constructor for testability.
- Use output bindings to simplify writing to storage/queues.
- Configure retry policies for transient failures.
- Use Application Insights for monitoring and logging.
- Store secrets in Azure Key Vault, reference in configuration.
- Use Durable Functions for stateful, long-running workflows.
- Keep functions small and focused on a single responsibility.
- Use async/await for I/O operations.
- Test functions locally with Azurite for storage emulation.
- Use managed identities for authentication to Azure services.
- Set appropriate timeout values based on function workload.
