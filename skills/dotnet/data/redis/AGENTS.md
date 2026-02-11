# Redis (StackExchange.Redis)

## Overview

Redis is an in-memory data structure store used as a distributed cache, message broker, and database. `StackExchange.Redis` is the primary .NET client library, providing a high-performance, multiplexed connection to Redis with support for all Redis data types: strings, hashes, lists, sets, sorted sets, streams, and pub/sub channels.

The library is built around the `ConnectionMultiplexer`, which manages connections efficiently and is designed to be shared as a singleton across the application. It supports both synchronous and asynchronous operations, pipelining, Lua scripting, transactions, and cluster mode.

Install via NuGet: `dotnet add package StackExchange.Redis`

## Connection Setup and DI Registration

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StackExchange.Redis;

var builder = Host.CreateApplicationBuilder(args);

// Register ConnectionMultiplexer as a singleton
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var configuration = ConfigurationOptions.Parse(
        builder.Configuration.GetConnectionString("Redis")!);
    configuration.AbortOnConnectFail = false;
    configuration.ConnectRetry = 3;
    configuration.ConnectTimeout = 5000;
    configuration.SyncTimeout = 5000;
    configuration.AsyncTimeout = 5000;
    return ConnectionMultiplexer.Connect(configuration);
});

// Convenience registration for IDatabase
builder.Services.AddScoped<IDatabase>(sp =>
{
    var multiplexer = sp.GetRequiredService<IConnectionMultiplexer>();
    return multiplexer.GetDatabase();
});

var app = builder.Build();
await app.RunAsync();
```

## String Operations (Key-Value)

```csharp
using StackExchange.Redis;
using System.Text.Json;

public sealed class RedisCacheService
{
    private readonly IDatabase _db;

    public RedisCacheService(IDatabase db)
    {
        _db = db;
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiry = null)
    {
        string json = JsonSerializer.Serialize(value);
        await _db.StringSetAsync(key, json, expiry);
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        RedisValue value = await _db.StringGetAsync(key);
        if (value.IsNullOrEmpty)
        {
            return default;
        }
        return JsonSerializer.Deserialize<T>(value.ToString());
    }

    public async Task<T> GetOrSetAsync<T>(
        string key, Func<Task<T>> factory, TimeSpan expiry)
    {
        RedisValue cached = await _db.StringGetAsync(key);
        if (!cached.IsNullOrEmpty)
        {
            return JsonSerializer.Deserialize<T>(cached.ToString())!;
        }

        T value = await factory();
        string json = JsonSerializer.Serialize(value);
        await _db.StringSetAsync(key, json, expiry);
        return value;
    }

    public async Task<bool> DeleteAsync(string key)
    {
        return await _db.KeyDeleteAsync(key);
    }

    public async Task<long> IncrementAsync(string key, long value = 1)
    {
        return await _db.StringIncrementAsync(key, value);
    }
}
```

## Hash Operations

Hashes store field-value pairs under a single key, ideal for representing objects.

```csharp
using StackExchange.Redis;

public sealed class UserSessionStore
{
    private readonly IDatabase _db;

    public UserSessionStore(IDatabase db)
    {
        _db = db;
    }

    public async Task SetSessionAsync(string sessionId, UserSession session)
    {
        string key = $"session:{sessionId}";
        HashEntry[] entries = new[]
        {
            new HashEntry("userId", session.UserId),
            new HashEntry("email", session.Email),
            new HashEntry("role", session.Role),
            new HashEntry("loginTime", session.LoginTime.ToString("O")),
            new HashEntry("ipAddress", session.IpAddress)
        };

        await _db.HashSetAsync(key, entries);
        await _db.KeyExpireAsync(key, TimeSpan.FromHours(2));
    }

    public async Task<UserSession?> GetSessionAsync(string sessionId)
    {
        string key = $"session:{sessionId}";
        HashEntry[] entries = await _db.HashGetAllAsync(key);

        if (entries.Length == 0)
        {
            return null;
        }

        var dict = entries.ToDictionary(
            e => e.Name.ToString(),
            e => e.Value.ToString());

        return new UserSession
        {
            UserId = dict["userId"],
            Email = dict["email"],
            Role = dict["role"],
            LoginTime = DateTime.Parse(dict["loginTime"]),
            IpAddress = dict["ipAddress"]
        };
    }

    public async Task UpdateFieldAsync(string sessionId, string field, string value)
    {
        await _db.HashSetAsync($"session:{sessionId}", field, value);
    }
}

public sealed class UserSession
{
    public string UserId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime LoginTime { get; set; }
    public string IpAddress { get; set; } = string.Empty;
}
```

## Sorted Sets (Leaderboards)

```csharp
using StackExchange.Redis;

public sealed class LeaderboardService
{
    private readonly IDatabase _db;
    private const string LeaderboardKey = "game:leaderboard";

    public LeaderboardService(IDatabase db)
    {
        _db = db;
    }

    public async Task AddScoreAsync(string playerId, double score)
    {
        await _db.SortedSetAddAsync(LeaderboardKey, playerId, score);
    }

    public async Task<double> IncrementScoreAsync(string playerId, double increment)
    {
        return await _db.SortedSetIncrementAsync(LeaderboardKey, playerId, increment);
    }

    public async Task<long?> GetRankAsync(string playerId)
    {
        // Rank is zero-based, descending order
        return await _db.SortedSetRankAsync(LeaderboardKey, playerId, Order.Descending);
    }

    public async Task<List<LeaderboardEntry>> GetTopPlayersAsync(int count)
    {
        SortedSetEntry[] entries = await _db.SortedSetRangeByRankWithScoresAsync(
            LeaderboardKey, 0, count - 1, Order.Descending);

        return entries.Select((e, index) => new LeaderboardEntry
        {
            Rank = index + 1,
            PlayerId = e.Element.ToString(),
            Score = e.Score
        }).ToList();
    }
}

public sealed class LeaderboardEntry
{
    public int Rank { get; set; }
    public string PlayerId { get; set; } = string.Empty;
    public double Score { get; set; }
}
```

## Pub/Sub Messaging

```csharp
using StackExchange.Redis;
using System.Text.Json;

public sealed class RedisEventBus
{
    private readonly IConnectionMultiplexer _multiplexer;

    public RedisEventBus(IConnectionMultiplexer multiplexer)
    {
        _multiplexer = multiplexer;
    }

    public async Task PublishAsync<T>(string channel, T message)
    {
        ISubscriber subscriber = _multiplexer.GetSubscriber();
        string json = JsonSerializer.Serialize(message);
        await subscriber.PublishAsync(RedisChannel.Literal(channel), json);
    }

    public async Task SubscribeAsync<T>(string channel, Action<T> handler)
    {
        ISubscriber subscriber = _multiplexer.GetSubscriber();
        await subscriber.SubscribeAsync(RedisChannel.Literal(channel), (ch, message) =>
        {
            if (!message.IsNullOrEmpty)
            {
                T? value = JsonSerializer.Deserialize<T>(message.ToString());
                if (value is not null)
                {
                    handler(value);
                }
            }
        });
    }

    public async Task UnsubscribeAsync(string channel)
    {
        ISubscriber subscriber = _multiplexer.GetSubscriber();
        await subscriber.UnsubscribeAsync(RedisChannel.Literal(channel));
    }
}
```

## Distributed Locking

```csharp
using StackExchange.Redis;

public sealed class RedisDistributedLock
{
    private readonly IDatabase _db;

    public RedisDistributedLock(IDatabase db)
    {
        _db = db;
    }

    public async Task<bool> AcquireAsync(string lockKey, string lockValue, TimeSpan expiry)
    {
        return await _db.StringSetAsync(
            $"lock:{lockKey}", lockValue, expiry, When.NotExists);
    }

    public async Task<bool> ReleaseAsync(string lockKey, string lockValue)
    {
        // Only release if we still own the lock (atomic via Lua script)
        const string script = @"
            if redis.call('get', KEYS[1]) == ARGV[1] then
                return redis.call('del', KEYS[1])
            else
                return 0
            end";

        RedisResult result = await _db.ScriptEvaluateAsync(
            script,
            new RedisKey[] { $"lock:{lockKey}" },
            new RedisValue[] { lockValue });

        return (int)result == 1;
    }

    public async Task<T> WithLockAsync<T>(
        string lockKey, TimeSpan timeout, Func<Task<T>> action)
    {
        string lockValue = Guid.NewGuid().ToString();
        var expiry = TimeSpan.FromSeconds(30);
        var start = DateTime.UtcNow;

        while (DateTime.UtcNow - start < timeout)
        {
            if (await AcquireAsync(lockKey, lockValue, expiry))
            {
                try
                {
                    return await action();
                }
                finally
                {
                    await ReleaseAsync(lockKey, lockValue);
                }
            }

            await Task.Delay(50);
        }

        throw new TimeoutException($"Could not acquire lock '{lockKey}' within {timeout}");
    }
}
```

## Rate Limiting with Redis

```csharp
using StackExchange.Redis;

public sealed class RedisRateLimiter
{
    private readonly IDatabase _db;

    public RedisRateLimiter(IDatabase db)
    {
        _db = db;
    }

    public async Task<RateLimitResult> CheckRateLimitAsync(
        string clientId, int maxRequests, TimeSpan window)
    {
        string key = $"ratelimit:{clientId}";
        long currentCount = await _db.StringIncrementAsync(key);

        if (currentCount == 1)
        {
            await _db.KeyExpireAsync(key, window);
        }

        TimeSpan? ttl = await _db.KeyTimeToLiveAsync(key);

        return new RateLimitResult
        {
            IsAllowed = currentCount <= maxRequests,
            CurrentCount = currentCount,
            Limit = maxRequests,
            RetryAfter = currentCount > maxRequests ? ttl : null
        };
    }
}

public sealed class RateLimitResult
{
    public bool IsAllowed { get; set; }
    public long CurrentCount { get; set; }
    public int Limit { get; set; }
    public TimeSpan? RetryAfter { get; set; }
}
```

## Redis Data Type Selection Guide

| Data Type | Redis Type | Example Use Case |
|---|---|---|
| Simple cache | String | Session tokens, JSON blobs |
| Object with fields | Hash | User profiles, product details |
| Ranked data | Sorted Set | Leaderboards, priority queues |
| Queue | List | Job queues, message buffers |
| Unique collection | Set | Tags, online users |
| Event stream | Stream | Activity feeds, event logs |
| Messaging | Pub/Sub | Real-time notifications |

## Best Practices

1. Register `ConnectionMultiplexer` as a singleton and reuse it across the entire application; creating multiple multiplexers wastes connections and degrades performance.
2. Set `AbortOnConnectFail = false` in `ConfigurationOptions` so the client retries connections gracefully rather than throwing an exception on the first failure.
3. Use `KeyExpireAsync` on every key that is not meant to live forever to prevent unbounded memory growth in the Redis instance.
4. Use hash operations (`HashSetAsync`, `HashGetAsync`) for objects with many fields instead of serializing the entire object as a JSON string, enabling partial field updates.
5. Release distributed locks using a Lua script that checks ownership before deleting to prevent accidentally releasing a lock acquired by another process after expiry.
6. Use `FireAndForget` command flags on non-critical write operations (e.g., analytics counters) to reduce latency by not waiting for the server acknowledgment.
7. Namespace all keys with a prefix (e.g., `"myapp:session:{id}"`) to avoid collisions when multiple applications share the same Redis instance.
8. Configure `SyncTimeout` and `AsyncTimeout` to values appropriate for your latency requirements (typically 1-5 seconds) and handle `TimeoutException` with retries.
9. Use pipelining by issuing multiple commands before awaiting any results (`batch = db.CreateBatch()`) to reduce network round trips for bulk operations.
10. Monitor Redis memory usage and eviction policy (`maxmemory-policy`) in production; use `allkeys-lru` for cache workloads and `noeviction` for data that must not be lost.
