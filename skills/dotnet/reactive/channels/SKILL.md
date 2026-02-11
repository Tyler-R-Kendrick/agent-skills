---
name: channels
description: >
  USE FOR: Implementing high-performance producer/consumer queues with backpressure using
  System.Threading.Channels for background processing, pipelines, and async message passing.
  DO NOT USE FOR: Simple async/await workflows without queuing, IObservable-based event streams
  (use Reactive Extensions), or distributed message queues (use RabbitMQ, Azure Service Bus).
license: MIT
metadata:
  displayName: System.Threading.Channels
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "System.Threading.Channels Documentation"
    url: "https://learn.microsoft.com/en-us/dotnet/core/extensions/channels"
  - title: "System.Threading.Channels NuGet Package"
    url: "https://www.nuget.org/packages/System.Threading.Channels"
---

# System.Threading.Channels

## Overview

`System.Threading.Channels` provides a set of synchronization data structures for passing data between producers and consumers asynchronously. Channels are the .NET equivalent of Go channels or Java's `BlockingQueue`, but designed for async/await patterns. They support bounded (fixed capacity with backpressure) and unbounded (unlimited capacity) configurations, single or multiple readers/writers, and integrate naturally with `IAsyncEnumerable<T>` for consumption.

Channels are part of the base class library (BCL) starting with .NET Core 3.0 and require no additional NuGet packages. They are the recommended primitive for background work queues, pipeline architectures, and high-throughput data processing.

## Bounded vs. Unbounded Channels

```csharp
using System.Threading.Channels;

// Bounded channel: blocks producers when full (backpressure)
Channel<WorkItem> bounded = Channel.CreateBounded<WorkItem>(
    new BoundedChannelOptions(capacity: 100)
    {
        FullMode = BoundedChannelFullMode.Wait,  // Block writer until space available
        SingleReader = true,   // Optimize for single consumer
        SingleWriter = false,  // Allow multiple producers
        AllowSynchronousContinuations = false  // Prevent stack dives
    });

// Unbounded channel: never blocks producers (risk of OOM)
Channel<WorkItem> unbounded = Channel.CreateUnbounded<WorkItem>(
    new UnboundedChannelOptions
    {
        SingleReader = true,
        SingleWriter = false,
        AllowSynchronousContinuations = false
    });

public record WorkItem(string Id, string Payload, DateTime CreatedAt);
```

## BoundedChannelFullMode Options

| Mode              | Behavior When Full                                      |
|-------------------|---------------------------------------------------------|
| `Wait`            | `WriteAsync` blocks until space is available (default)  |
| `DropNewest`      | Drops the most recently written item to make space      |
| `DropOldest`      | Drops the oldest item in the channel to make space      |
| `DropWrite`       | Drops the item being written (current write is lost)    |

## Background Worker Pattern

The most common pattern: a hosted service reads from a channel while request handlers write to it.

```csharp
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MyApp.Services;

public sealed class EmailWorkItem
{
    public required string To { get; init; }
    public required string Subject { get; init; }
    public required string Body { get; init; }
}

public interface IEmailQueue
{
    ValueTask EnqueueAsync(EmailWorkItem item, CancellationToken ct = default);
}

public sealed class EmailQueue : IEmailQueue
{
    private readonly Channel<EmailWorkItem> _channel;

    public EmailQueue()
    {
        _channel = Channel.CreateBounded<EmailWorkItem>(
            new BoundedChannelOptions(500)
            {
                FullMode = BoundedChannelFullMode.Wait,
                SingleReader = true,
                SingleWriter = false
            });
    }

    public ChannelReader<EmailWorkItem> Reader => _channel.Reader;

    public async ValueTask EnqueueAsync(
        EmailWorkItem item, CancellationToken ct = default)
    {
        await _channel.Writer.WriteAsync(item, ct);
    }
}

public sealed class EmailSenderWorker : BackgroundService
{
    private readonly EmailQueue _queue;
    private readonly IEmailSender _sender;
    private readonly ILogger<EmailSenderWorker> _logger;

    public EmailSenderWorker(
        EmailQueue queue,
        IEmailSender sender,
        ILogger<EmailSenderWorker> logger)
    {
        _queue = queue;
        _sender = sender;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Email worker started");

        await foreach (var item in _queue.Reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                await _sender.SendAsync(item.To, item.Subject, item.Body, stoppingToken);
                _logger.LogInformation("Sent email to {To}", item.To);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {To}", item.To);
            }
        }

        _logger.LogInformation("Email worker stopped");
    }
}

public interface IEmailSender
{
    Task SendAsync(string to, string subject, string body, CancellationToken ct);
}
```

Registration and usage:

```csharp
// Program.cs
using MyApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<EmailQueue>();
builder.Services.AddSingleton<IEmailQueue>(sp => sp.GetRequiredService<EmailQueue>());
builder.Services.AddHostedService<EmailSenderWorker>();

var app = builder.Build();

// Minimal API endpoint that enqueues work
app.MapPost("/api/contact", async (ContactRequest request, IEmailQueue queue) =>
{
    await queue.EnqueueAsync(new EmailWorkItem
    {
        To = "support@example.com",
        Subject = $"Contact from {request.Name}",
        Body = request.Message
    });
    return Results.Accepted();
});

app.Run();

public record ContactRequest(string Name, string Email, string Message);
```

## Pipeline Pattern

Chain multiple channels together to create a processing pipeline.

```csharp
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace MyApp.Pipeline;

public sealed class DataPipeline
{
    private readonly Channel<RawEvent> _ingest;
    private readonly Channel<ParsedEvent> _parsed;
    private readonly Channel<EnrichedEvent> _enriched;

    public DataPipeline()
    {
        _ingest = Channel.CreateBounded<RawEvent>(1000);
        _parsed = Channel.CreateBounded<ParsedEvent>(500);
        _enriched = Channel.CreateBounded<EnrichedEvent>(200);
    }

    public ChannelWriter<RawEvent> Input => _ingest.Writer;
    public ChannelReader<EnrichedEvent> Output => _enriched.Reader;

    public async Task RunAsync(CancellationToken ct)
    {
        // Run all pipeline stages concurrently
        await Task.WhenAll(
            ParseStageAsync(ct),
            EnrichStageAsync(ct),
            StoreStageAsync(ct));
    }

    private async Task ParseStageAsync(CancellationToken ct)
    {
        await foreach (var raw in _ingest.Reader.ReadAllAsync(ct))
        {
            var parsed = new ParsedEvent(
                raw.Id,
                DateTime.Parse(raw.Timestamp),
                raw.Data);
            await _parsed.Writer.WriteAsync(parsed, ct);
        }
        _parsed.Writer.Complete();
    }

    private async Task EnrichStageAsync(CancellationToken ct)
    {
        await foreach (var parsed in _parsed.Reader.ReadAllAsync(ct))
        {
            var enriched = new EnrichedEvent(
                parsed.Id,
                parsed.Timestamp,
                parsed.Data,
                Source: "pipeline-v1",
                ProcessedAt: DateTime.UtcNow);
            await _enriched.Writer.WriteAsync(enriched, ct);
        }
        _enriched.Writer.Complete();
    }

    private async Task StoreStageAsync(CancellationToken ct)
    {
        await foreach (var enriched in _enriched.Reader.ReadAllAsync(ct))
        {
            // Store to database, send to downstream system, etc.
        }
    }
}

public record RawEvent(string Id, string Timestamp, string Data);
public record ParsedEvent(string Id, DateTime Timestamp, string Data);
public record EnrichedEvent(
    string Id, DateTime Timestamp, string Data,
    string Source, DateTime ProcessedAt);
```

## Fan-Out Pattern (Multiple Consumers)

```csharp
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace MyApp.Processing;

public sealed class ParallelProcessor<T>
{
    private readonly Channel<T> _channel;
    private readonly Func<T, CancellationToken, Task> _handler;
    private readonly int _workerCount;

    public ParallelProcessor(
        int capacity,
        int workerCount,
        Func<T, CancellationToken, Task> handler)
    {
        _channel = Channel.CreateBounded<T>(new BoundedChannelOptions(capacity)
        {
            SingleReader = false,  // Multiple consumers
            SingleWriter = false
        });
        _handler = handler;
        _workerCount = workerCount;
    }

    public ValueTask EnqueueAsync(T item, CancellationToken ct) =>
        _channel.Writer.WriteAsync(item, ct);

    public void Complete() => _channel.Writer.Complete();

    public async Task ProcessAsync(CancellationToken ct)
    {
        var workers = Enumerable.Range(0, _workerCount)
            .Select(_ => WorkerAsync(ct))
            .ToArray();

        await Task.WhenAll(workers);
    }

    private async Task WorkerAsync(CancellationToken ct)
    {
        await foreach (var item in _channel.Reader.ReadAllAsync(ct))
        {
            await _handler(item, ct);
        }
    }
}
```

## Channels vs. Alternatives

| Feature               | Channel<T>            | BlockingCollection<T>  | ConcurrentQueue<T>    | BufferBlock<T>         |
|-----------------------|-----------------------|------------------------|-----------------------|------------------------|
| Async support         | Native async/await    | Blocking only          | No built-in waiting   | Native async/await     |
| Backpressure          | Bounded with modes    | Bounded (blocking)     | No                    | Bounded (blocking)     |
| Completion signal     | `Writer.Complete()`   | `CompleteAdding()`     | No                    | `Complete()`           |
| IAsyncEnumerable      | `ReadAllAsync()`      | No                     | No                    | No                     |
| Performance           | Lock-free (single R/W)| Lock-based             | Lock-free             | Lock-based             |
| NuGet dependency      | None (BCL)            | None (BCL)             | None (BCL)            | TPL Dataflow package   |

## Best Practices

1. **Use bounded channels with `BoundedChannelFullMode.Wait` as the default** to apply backpressure when the consumer cannot keep up, preventing unbounded memory growth that leads to `OutOfMemoryException` in production.

2. **Set `SingleReader = true` when only one consumer reads from the channel** because the channel implementation uses a more efficient lock-free algorithm when it knows only one thread reads, improving throughput by 20-40%.

3. **Set `AllowSynchronousContinuations = false` in production code** to prevent the writer's thread from executing the reader's continuation synchronously, which can cause stack overflows in deep producer chains and unpredictable latency.

4. **Call `Writer.Complete()` when the producer is finished to signal downstream consumers** that no more items will arrive; this causes `ReadAllAsync()` to exit its enumeration loop gracefully and enables pipeline teardown.

5. **Wrap `ReadAllAsync()` consumption in a `try/catch` inside `BackgroundService.ExecuteAsync`** so that a transient processing failure for one item does not crash the entire worker; log the error and continue processing the next item.

6. **Register the channel and its hosted service as singletons** because channels are designed to be long-lived shared objects; scoped or transient channels lose their contents when the scope ends.

7. **Use `ChannelReader<T>` and `ChannelWriter<T>` as the injected types** rather than `Channel<T>` itself to enforce the separation of concerns between producers (which only need the writer) and consumers (which only need the reader).

8. **Size bounded channels based on expected burst size, not average throughput** -- if the producer can spike to 1000 items/second but the consumer processes 100 items/second, set the capacity to absorb a 10-second burst (10,000) or choose a `DropOldest` policy.

9. **Prefer `WriteAsync` over `TryWrite` in most scenarios** because `WriteAsync` awaits capacity in bounded channels and reports cancellation correctly, while `TryWrite` silently drops items when the channel is full.

10. **Use the pipeline pattern (chained channels) for multi-stage processing** rather than putting all logic in a single consumer, because separate stages can be scaled independently and each stage's backpressure propagates upstream through bounded channel boundaries.
