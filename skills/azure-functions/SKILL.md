---
description: Guidance for Azure Functions serverless compute platform.
metadata:
  displayName: Azure Functions
---

# Azure Functions

## Overview
Azure Functions is a serverless compute service that enables you to run event-driven code without managing infrastructure.

## Example
```csharp
public class HttpTriggerFunction
{
    [FunctionName("ProcessOrder")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")] 
        HttpRequest req,
        ILogger log)
    {
        var order = await req.ReadFromJsonAsync<Order>();
        await ProcessOrder(order);
        return new OkResult();
    }
}
```

## Trigger Types
- HTTP Trigger
- Timer Trigger
- Queue Trigger
- Blob Trigger
- Event Hub Trigger

## Best Practices
- Keep functions small and focused
- Use dependency injection
- Implement proper error handling
- Configure appropriate timeout values
- Use durable functions for orchestrations
