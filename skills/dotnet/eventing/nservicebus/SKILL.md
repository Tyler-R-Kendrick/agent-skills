---
name: nservicebus
description: Guidance for NServiceBus usage. Use when working with nservicebus.
license: MIT
metadata:
  displayName: "NServiceBus"
  author: "Tyler-R-Kendrick"
---

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