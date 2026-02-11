# Automatonymous

## Overview
Automatonymous is a state machine library for .NET that integrates with MassTransit for distributed workflows.

## Example
```csharp
using Automatonymous;

public class OrderStateMachine : MassTransitStateMachine<OrderState>
{
    public OrderStateMachine()
    {
        InstanceState(x => x.CurrentState);
        
        Event(() => OrderSubmitted);
        Event(() => OrderApproved);
        
        Initially(
            When(OrderSubmitted)
                .TransitionTo(Submitted));
        
        During(Submitted,
            When(OrderApproved)
                .TransitionTo(Approved)
                .ThenAsync(async context => await ProcessOrder(context)));
    }
    
    public State Submitted { get; private set; }
    public State Approved { get; private set; }
    public Event<OrderSubmitted> OrderSubmitted { get; private set; }
    public Event<OrderApproved> OrderApproved { get; private set; }
}
```

## Best Practices
- Model complex workflows
- Use with MassTransit for distributed sagas
- Handle compensation logic
- Test state transitions
