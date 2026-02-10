---
name: channels
description: Guidance for System.Threading.Channels usage. Use when working with channels.
license: MIT
metadata:
  displayName: "System.Threading.Channels"
  author: "Tyler-R-Kendrick"
---

# System.Threading.Channels

## Overview
Use `Channel<T>` for producer/consumer queues with backpressure.

## Example
```csharp
var channel = Channel.CreateBounded<WorkItem>(new BoundedChannelOptions(100)
{
	SingleReader = true,
	SingleWriter = false
});

await foreach (var item in channel.Reader.ReadAllAsync(ct))
{
	await handler.HandleAsync(item, ct);
}
```

## Guidance
- Use bounded channels to avoid unbounded memory growth.
- Prefer a single reader for ordered processing.