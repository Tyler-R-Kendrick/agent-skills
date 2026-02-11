# Peasy

## Overview
Peasy is a middle tier framework that provides a simple pattern for implementing business rules and validation.

## Example
```csharp
public class CreateOrderRule : RuleBase
{
    private readonly Order _order;
    
    public CreateOrderRule(Order order)
    {
        _order = order;
    }
    
    protected override Task OnValidateAsync()
    {
        if (_order.Items.Count == 0)
            Invalidate("Order must have at least one item");
            
        if (_order.Total < 0)
            Invalidate("Order total cannot be negative");
            
        return Task.CompletedTask;
    }
}

// Usage
var rule = new CreateOrderRule(order);
var result = await rule.ValidateAsync();
if (!result.IsValid)
{
    // Handle errors
}
```

## Best Practices
- Keep rules focused and testable
- Compose complex rules from simple ones
- Return meaningful error messages
