# TimeProvider

## Overview
Use `TimeProvider` to centralize time access and make time controllable in tests.

## When to use
- Any service that needs current time, timers, or delays.

## Setup
```csharp
builder.Services.AddSingleton(TimeProvider.System);
```

## Example
```csharp
public sealed class TokenService(TimeProvider timeProvider)
{
	public DateTimeOffset IssuedAt() => timeProvider.GetUtcNow();
}
```

## Guidance
- Avoid `DateTimeOffset.UtcNow` directly in application code.
- Use `FakeTimeProvider` in tests for deterministic behavior.