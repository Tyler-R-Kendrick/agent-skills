---
description: Guidance for Plastic rules engine using command pattern.
metadata:
  displayName: Plastic
---

# Plastic

## Overview
Plastic is a rules engine that uses the command pattern to define and execute business rules.

## Example
```csharp
public class ValidateOrderCommand : ICommand
{
    public Order Order { get; set; }
    
    public void Execute()
    {
        if (Order.Total < 10)
            throw new ValidationException("Minimum order is $10");
            
        if (Order.Items.Count == 0)
            throw new ValidationException("Order must have items");
    }
}

// Chain commands
var pipeline = new CommandPipeline()
    .Add(new ValidateOrderCommand { Order = order })
    .Add(new CalculateTaxCommand { Order = order })
    .Add(new SaveOrderCommand { Order = order });
    
pipeline.Execute();
```

## Best Practices
- Make commands atomic
- Handle rollback scenarios
- Log command execution
- Use pipelines for workflows
