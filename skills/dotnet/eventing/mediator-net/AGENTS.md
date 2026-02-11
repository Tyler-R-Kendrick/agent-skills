# Mediator.NET

## Overview
Mediator.NET implements the mediator pattern for decoupling request/response and command handling.

## Example
```csharp
// Command
public class CreateOrderCommand : ICommand
{
    public string CustomerId { get; set; }
}

// Handler
public class CreateOrderHandler : ICommandHandler<CreateOrderCommand>
{
    public async Task Handle(CreateOrderCommand command)
    {
        // Handle command
    }
}

// Usage
await mediator.SendAsync(new CreateOrderCommand 
{ 
    CustomerId = "123" 
});
```

## Best Practices
- One handler per command/query
- Keep handlers focused
- Use pipeline for cross-cutting concerns
- Validate in handlers or validators
- Return results from queries
