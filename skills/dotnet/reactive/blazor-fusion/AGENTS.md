# Blazor Fusion

## Overview
Fusion provides computed observables and real-time state synchronization for Blazor applications.

## Example
```csharp
using Stl.Fusion;

public interface ICounterService
{
    [ComputeMethod]
    Task<int> GetCounterAsync();
    Task IncrementAsync();
}

public class CounterService : ICounterService
{
    private int _counter;
    
    [ComputeMethod]
    public virtual async Task<int> GetCounterAsync()
    {
        return _counter;
    }
    
    public async Task IncrementAsync()
    {
        Interlocked.Increment(ref _counter);
        using (Computed.Invalidate())
            _ = GetCounterAsync();
    }
}
```

## Best Practices
- Use ComputeMethod for reactive data
- Invalidate computed values on updates
- Leverage real-time synchronization
- Cache computed results
