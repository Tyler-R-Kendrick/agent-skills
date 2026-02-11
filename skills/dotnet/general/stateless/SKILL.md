---
name: stateless
description: Guidance for Stateless state machine library.
metadata:
  displayName: Stateless
---

# Stateless

## Overview
Stateless is a simple library for creating state machines in .NET with a fluent configuration API.

## Example
```csharp
using Stateless;

enum State { Off, On }
enum Trigger { PowerButton, Break }

var stateMachine = new StateMachine<State, Trigger>(State.Off);

stateMachine.Configure(State.Off)
    .Permit(Trigger.PowerButton, State.On);

stateMachine.Configure(State.On)
    .Permit(Trigger.PowerButton, State.Off)
    .Permit(Trigger.Break, State.Off)
    .OnEntry(() => Console.WriteLine("Light on"))
    .OnExit(() => Console.WriteLine("Light off"));

// Fire triggers
stateMachine.Fire(Trigger.PowerButton);  // State.On
stateMachine.Fire(Trigger.PowerButton);  // State.Off
```

## Best Practices
- Model clear state transitions
- Use guards for conditional transitions
- Implement entry/exit actions
- Visualize state machines
- Handle invalid transitions
