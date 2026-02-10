---
description: Guidance for Brighter command dispatcher library.
metadata:
  displayName: Brighter
---

# Brighter

## Overview
Brighter is a command dispatcher and task queue library supporting CQRS patterns and asynchronous messaging.

## Example
```csharp
using Paramore.Brighter;

// Command
public class CreateOrderCommand : Command
{
    public string CustomerId { get; set; }
    public decimal Total { get; set; }
}

// Handler
public class CreateOrderHandler : RequestHandler<CreateOrderCommand>
{
    public override CreateOrderCommand Handle(CreateOrderCommand command)
    {
        // Handle command
        return base.Handle(command);
    }
}

// Configure
var registry = new SubscriberRegistry();
registry.Register<CreateOrderCommand, CreateOrderHandler>();

var builder = CommandProcessorBuilder.With()
    .Handlers(new HandlerConfiguration(registry))
    .DefaultPolicy()
    .NoTaskQueues()
    .RequestContextFactory(new InMemoryRequestContextFactory());

var commandProcessor = builder.Build();

// Send
await commandProcessor.SendAsync(new CreateOrderCommand 
{ 
    CustomerId = "123" 
});
```

## Best Practices
- Use attributes for cross-cutting concerns
- Implement retry policies
- Use task queues for async processing
