---
description: Guidance for Redis distributed cache and data store.
metadata:
  displayName: Redis
---

# Redis

## Overview
Redis is an in-memory data structure store used as a database, cache, and message broker.

## Example with StackExchange.Redis
```csharp
using StackExchange.Redis;

var redis = ConnectionMultiplexer.Connect("localhost:6379");
var db = redis.GetDatabase();

// Set/Get
await db.StringSetAsync("key", "value");
var value = await db.StringGetAsync("key");

// Lists
await db.ListLeftPushAsync("mylist", "item1");
var items = await db.ListRangeAsync("mylist");

// Pub/Sub
var sub = redis.GetSubscriber();
await sub.SubscribeAsync("channel", (ch, msg) => 
    Console.WriteLine(msg));
await sub.PublishAsync("channel", "message");
```

## Use Cases
- Caching
- Session storage
- Real-time analytics
- Message queues
- Leaderboards

## Best Practices
- Use connection multiplexer singleton
- Set appropriate expiration
- Handle connection failures
- Use pipelines for bulk operations
