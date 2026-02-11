---
name: timeprovider
description: >
  Guidance for TimeProvider abstraction for testable time-dependent code.
  USE FOR: making time-dependent code testable, replacing DateTime.UtcNow and DateTimeOffset.UtcNow
  with injectable abstractions, controlling time in unit tests with FakeTimeProvider,
  testing expiration logic, scheduling, token lifetimes, and time-based business rules.
  DO NOT USE FOR: high-precision timing or benchmarking (use Stopwatch), NTP synchronization,
  or scenarios running on .NET versions prior to .NET 8.
license: MIT
metadata:
  displayName: "TimeProvider"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# TimeProvider

## Overview

`TimeProvider` is a .NET 8+ abstraction that centralizes time access (`GetUtcNow()`, `GetLocalNow()`, `GetTimestamp()`) and timer creation behind an injectable class. In production, you use `TimeProvider.System` which delegates to the system clock. In tests, you use `FakeTimeProvider` from `Microsoft.Extensions.TimeProvider.Testing` to freeze, advance, and control time deterministically. This eliminates the common anti-pattern of calling `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in business logic, which makes time-dependent code untestable without real-time waits.

## Service Registration

Register `TimeProvider` in the DI container for production use.

```csharp
using Microsoft.Extensions.DependencyInjection;

// Program.cs - register the system clock
builder.Services.AddSingleton(TimeProvider.System);

// Alternatively, register as the abstract type
builder.Services.AddSingleton<TimeProvider>(TimeProvider.System);
```

## Injecting TimeProvider in Services

Replace `DateTime.UtcNow` and `DateTimeOffset.UtcNow` with `TimeProvider`.

```csharp
public sealed class TokenService
{
    private readonly TimeProvider _timeProvider;
    private readonly TimeSpan _tokenLifetime = TimeSpan.FromHours(1);

    public TokenService(TimeProvider timeProvider)
    {
        _timeProvider = timeProvider;
    }

    public Token GenerateToken(string userId)
    {
        var now = _timeProvider.GetUtcNow();
        return new Token
        {
            UserId = userId,
            IssuedAt = now,
            ExpiresAt = now.Add(_tokenLifetime),
            Value = Guid.NewGuid().ToString("N")
        };
    }

    public bool IsTokenValid(Token token)
    {
        var now = _timeProvider.GetUtcNow();
        return token.ExpiresAt > now;
    }
}

public record Token
{
    public string UserId { get; init; } = string.Empty;
    public DateTimeOffset IssuedAt { get; init; }
    public DateTimeOffset ExpiresAt { get; init; }
    public string Value { get; init; } = string.Empty;
}
```

## Testing with FakeTimeProvider

Use `FakeTimeProvider` to control time in unit tests.

```csharp
using Microsoft.Extensions.Time.Testing;
using Xunit;

public class TokenServiceTests
{
    [Fact]
    public void GenerateToken_Sets_Correct_Expiry()
    {
        // Arrange: freeze time at a known point
        var fakeTime = new FakeTimeProvider(
            new DateTimeOffset(2025, 6, 15, 12, 0, 0, TimeSpan.Zero));
        var service = new TokenService(fakeTime);

        // Act
        var token = service.GenerateToken("user-1");

        // Assert: token expires exactly 1 hour from "now"
        Assert.Equal(
            new DateTimeOffset(2025, 6, 15, 12, 0, 0, TimeSpan.Zero),
            token.IssuedAt);
        Assert.Equal(
            new DateTimeOffset(2025, 6, 15, 13, 0, 0, TimeSpan.Zero),
            token.ExpiresAt);
    }

    [Fact]
    public void Token_Is_Valid_Before_Expiry()
    {
        var fakeTime = new FakeTimeProvider(
            new DateTimeOffset(2025, 6, 15, 12, 0, 0, TimeSpan.Zero));
        var service = new TokenService(fakeTime);
        var token = service.GenerateToken("user-1");

        // Advance time by 30 minutes (still within 1 hour lifetime)
        fakeTime.Advance(TimeSpan.FromMinutes(30));

        Assert.True(service.IsTokenValid(token));
    }

    [Fact]
    public void Token_Is_Invalid_After_Expiry()
    {
        var fakeTime = new FakeTimeProvider(
            new DateTimeOffset(2025, 6, 15, 12, 0, 0, TimeSpan.Zero));
        var service = new TokenService(fakeTime);
        var token = service.GenerateToken("user-1");

        // Advance time past the 1 hour expiry
        fakeTime.Advance(TimeSpan.FromHours(2));

        Assert.False(service.IsTokenValid(token));
    }
}
```

## Time-Based Business Rules

Test complex time-dependent business logic deterministically.

```csharp
public sealed class SubscriptionService
{
    private readonly TimeProvider _timeProvider;

    public SubscriptionService(TimeProvider timeProvider)
    {
        _timeProvider = timeProvider;
    }

    public SubscriptionStatus GetStatus(Subscription subscription)
    {
        var now = _timeProvider.GetUtcNow();

        if (now < subscription.StartDate)
            return SubscriptionStatus.Pending;
        if (now > subscription.EndDate)
            return SubscriptionStatus.Expired;
        if (subscription.EndDate - now <= TimeSpan.FromDays(7))
            return SubscriptionStatus.ExpiringSoon;

        return SubscriptionStatus.Active;
    }

    public bool IsInTrialPeriod(Subscription subscription)
    {
        var now = _timeProvider.GetUtcNow();
        var trialEnd = subscription.StartDate.AddDays(14);
        return now >= subscription.StartDate && now <= trialEnd;
    }

    public int DaysRemaining(Subscription subscription)
    {
        var now = _timeProvider.GetUtcNow();
        var remaining = subscription.EndDate - now;
        return Math.Max(0, (int)remaining.TotalDays);
    }
}

public record Subscription
{
    public DateTimeOffset StartDate { get; init; }
    public DateTimeOffset EndDate { get; init; }
    public string Plan { get; init; } = string.Empty;
}

public enum SubscriptionStatus
{
    Pending,
    Active,
    ExpiringSoon,
    Expired
}
```

## Testing Business Rules

Test each subscription status transition with controlled time.

```csharp
using Microsoft.Extensions.Time.Testing;
using Xunit;

public class SubscriptionServiceTests
{
    private readonly FakeTimeProvider _fakeTime;
    private readonly SubscriptionService _service;
    private readonly Subscription _subscription;

    public SubscriptionServiceTests()
    {
        _fakeTime = new FakeTimeProvider(
            new DateTimeOffset(2025, 1, 15, 0, 0, 0, TimeSpan.Zero));
        _service = new SubscriptionService(_fakeTime);
        _subscription = new Subscription
        {
            StartDate = new DateTimeOffset(2025, 1, 1, 0, 0, 0, TimeSpan.Zero),
            EndDate = new DateTimeOffset(2025, 12, 31, 23, 59, 59, TimeSpan.Zero),
            Plan = "Annual"
        };
    }

    [Fact]
    public void Status_Is_Pending_Before_Start()
    {
        // Set time to before subscription start
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2024, 12, 25, 0, 0, 0, TimeSpan.Zero));

        Assert.Equal(SubscriptionStatus.Pending,
            _service.GetStatus(_subscription));
    }

    [Fact]
    public void Status_Is_Active_During_Subscription()
    {
        Assert.Equal(SubscriptionStatus.Active,
            _service.GetStatus(_subscription));
    }

    [Fact]
    public void Status_Is_ExpiringeSoon_Within_7_Days()
    {
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2025, 12, 28, 0, 0, 0, TimeSpan.Zero));

        Assert.Equal(SubscriptionStatus.ExpiringeSoon,
            _service.GetStatus(_subscription));
    }

    [Fact]
    public void Status_Is_Expired_After_End()
    {
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2026, 1, 2, 0, 0, 0, TimeSpan.Zero));

        Assert.Equal(SubscriptionStatus.Expired,
            _service.GetStatus(_subscription));
    }

    [Fact]
    public void Trial_Period_Is_First_14_Days()
    {
        // Day 10: still in trial
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2025, 1, 10, 0, 0, 0, TimeSpan.Zero));
        Assert.True(_service.IsInTrialPeriod(_subscription));

        // Day 20: past trial
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2025, 1, 20, 0, 0, 0, TimeSpan.Zero));
        Assert.False(_service.IsInTrialPeriod(_subscription));
    }

    [Fact]
    public void DaysRemaining_Decreases_Over_Time()
    {
        _fakeTime.SetUtcNow(
            new DateTimeOffset(2025, 12, 1, 0, 0, 0, TimeSpan.Zero));
        int remaining = _service.DaysRemaining(_subscription);
        Assert.Equal(30, remaining);

        _fakeTime.Advance(TimeSpan.FromDays(15));
        remaining = _service.DaysRemaining(_subscription);
        Assert.Equal(15, remaining);
    }
}
```

## Timer Testing with FakeTimeProvider

Test timer-based logic without real delays.

```csharp
using Microsoft.Extensions.Time.Testing;
using Xunit;

public sealed class PollingService : IDisposable
{
    private readonly TimeProvider _timeProvider;
    private readonly ITimer _timer;
    private int _pollCount;

    public int PollCount => _pollCount;

    public PollingService(TimeProvider timeProvider)
    {
        _timeProvider = timeProvider;
        _timer = timeProvider.CreateTimer(
            callback: _ => Interlocked.Increment(ref _pollCount),
            state: null,
            dueTime: TimeSpan.Zero,
            period: TimeSpan.FromSeconds(30));
    }

    public void Dispose() => _timer.Dispose();
}

public class PollingServiceTests
{
    [Fact]
    public void Timer_Fires_On_Schedule()
    {
        var fakeTime = new FakeTimeProvider();
        using var service = new PollingService(fakeTime);

        // Initial callback fires immediately
        Assert.Equal(1, service.PollCount);

        // Advance 30 seconds: second callback
        fakeTime.Advance(TimeSpan.FromSeconds(30));
        Assert.Equal(2, service.PollCount);

        // Advance another 60 seconds: two more callbacks
        fakeTime.Advance(TimeSpan.FromSeconds(60));
        Assert.Equal(4, service.PollCount);
    }
}
```

## TimeProvider API Comparison

| API | `TimeProvider.System` | `FakeTimeProvider` |
|-----|----------------------|-------------------|
| `GetUtcNow()` | Real system clock | Controlled value |
| `GetLocalNow()` | Real local time | Controlled + timezone |
| `GetTimestamp()` | Real high-res counter | Controlled counter |
| `CreateTimer()` | Real timer with delays | Fires on `Advance()` |
| Thread safety | Yes | Yes |
| Requires .NET 8+ | Yes | Yes |

## Best Practices

1. **Never call `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in application code**: always inject `TimeProvider` and call `GetUtcNow()` so time can be controlled in tests.
2. **Register `TimeProvider.System` as a singleton**: the system time provider is stateless and thread-safe; register it once at the composition root.
3. **Use `FakeTimeProvider.Advance()` to simulate time progression**: advance by specific durations to test expiration, scheduling, and timeout logic without real waits.
4. **Use `FakeTimeProvider.SetUtcNow()` to jump to specific points in time**: for testing scenarios like "what happens on December 31st", set the exact date rather than calculating an advance duration.
5. **Initialize `FakeTimeProvider` with a known starting time**: pass an explicit `DateTimeOffset` to the constructor (`new FakeTimeProvider(startTime)`) so test assertions are deterministic and readable.
6. **Test timer callbacks by advancing `FakeTimeProvider`**: timers created via `timeProvider.CreateTimer()` fire synchronously when `Advance()` crosses their due time, enabling timer testing without `Task.Delay`.
7. **Use `TimeProvider` for all time-related operations in a class**: if a class uses both `GetUtcNow()` and `CreateTimer()`, both should come from the same injected `TimeProvider` instance for consistent behavior in tests.
8. **Test boundary conditions around time transitions**: verify behavior at exactly the expiration moment, one millisecond before, and one millisecond after to catch off-by-one errors in time comparisons.
9. **Avoid mixing `TimeProvider` with direct `Task.Delay` calls**: use `timeProvider.CreateTimer()` or `Task.Delay(duration, timeProvider)` (via extension methods) so delays are also controllable in tests.
10. **Install `Microsoft.Extensions.TimeProvider.Testing` only in test projects**: the base `TimeProvider` class is built into .NET 8+; the `FakeTimeProvider` package is a test-only dependency.
