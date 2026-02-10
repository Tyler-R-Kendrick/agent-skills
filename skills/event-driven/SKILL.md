---
description: Guidance for event-driven architecture patterns and best practices.
metadata:
  displayName: Event-Driven Architecture
---

# Event-Driven Architecture

## Overview
Event-driven architecture (EDA) is a design pattern where system components communicate through events, enabling loose coupling and scalability.

## Key Concepts
- **Events**: Represent significant state changes or occurrences
- **Event Producers**: Emit events when actions occur
- **Event Consumers**: React to events asynchronously
- **Event Bus/Broker**: Manages event distribution

## Example
```csharp
public class OrderPlacedEvent
{
    public Guid OrderId { get; init; }
    public DateTime PlacedAt { get; init; }
}

public class OrderProcessor
{
    public async Task HandleOrderPlaced(OrderPlacedEvent evt)
    {
        // Process the order asynchronously
        await ProcessOrder(evt.OrderId);
    }
}
```

## Best Practices
- Use descriptive event names that describe what happened
- Keep events immutable
- Include relevant context in events
- Handle idempotency for event processing
- Consider event versioning strategies
- Implement proper error handling and retry logic
