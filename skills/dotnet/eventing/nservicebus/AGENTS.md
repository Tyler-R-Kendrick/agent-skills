# NServiceBus

## Overview
Use NServiceBus for enterprise messaging with recoverability and routing.

## Example
```csharp
var endpointConfiguration = new EndpointConfiguration("Sales");
endpointConfiguration.UseTransport<LearningTransport>();
```

## Guidance
- Prefer message-driven workflows over tight coupling.
- Use sagas for long-running workflows.