---
name: orleans
description: |
  Use when building distributed, stateful applications with Microsoft Orleans. Covers grain design, state persistence, streams, timers, reminders, clustering, and ASP.NET Core co-hosting for virtual actor workloads.
  USE FOR: distributed virtual actor systems, per-entity stateful services (IoT devices, user sessions, game objects), scalable real-time applications, grain-based event processing, geographically distributed stateful workloads
  DO NOT USE FOR: stateless HTTP APIs without actor patterns (use ASP.NET Core), simple background tasks (use IHostedService), Dapr actor model (use dapr), ML model training (use mlnet), serverless event processing (use azure-functions)
license: MIT
metadata:
  displayName: "Orleans"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
---

# Orleans

## Overview
Microsoft Orleans is a framework for building distributed, scalable, stateful applications using the virtual actor model. Grains (virtual actors) are the fundamental units of computation and state, activated on demand and transparently distributed across a cluster of silos. Orleans handles grain placement, lifecycle, state persistence, and messaging, letting developers focus on business logic while achieving horizontal scalability.

## NuGet Packages
```bash
dotnet add package Microsoft.Orleans.Server              # Silo (server-side)
dotnet add package Microsoft.Orleans.Client              # External client
dotnet add package Microsoft.Orleans.Sdk                 # Source generators
dotnet add package Microsoft.Orleans.Persistence.AdoNet  # SQL persistence
dotnet add package Microsoft.Orleans.Persistence.AzureStorage  # Azure Table/Blob
dotnet add package Microsoft.Orleans.Clustering.AzureStorage   # Azure clustering
dotnet add package Microsoft.Orleans.Streaming            # Stream providers
```

## Silo Setup (Co-hosted with ASP.NET Core)
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Host.UseOrleans(silo =>
{
    if (builder.Environment.IsDevelopment())
    {
        silo.UseLocalhostClustering()
            .AddMemoryGrainStorage("default")
            .AddMemoryGrainStorage("urls");
    }
    else
    {
        silo.UseAzureStorageClustering(options =>
        {
            options.TableServiceClient = new TableServiceClient(
                builder.Configuration["Azure:StorageConnectionString"]);
        })
        .AddAzureTableGrainStorage("default", options =>
        {
            options.TableServiceClient = new TableServiceClient(
                builder.Configuration["Azure:StorageConnectionString"]);
        });
    }
});

var app = builder.Build();

app.MapGet("/shorten/{*path}", async (IGrainFactory grains, HttpRequest request, string path) =>
{
    var shortenedRouteSegment = request.Query["short"].ToString();
    var grain = grains.GetGrain<IUrlShortenerGrain>(shortenedRouteSegment);
    var url = await grain.GetUrlAsync();
    return url is not null ? Results.Redirect(url) : Results.NotFound();
});

app.Run();
```

## Grain Interfaces
Grain interfaces define the contract. All grain methods must return `Task` or `Task<T>`.

```csharp
public interface IPlayerGrain : IGrainWithStringKey
{
    Task<PlayerState> GetStateAsync();
    Task SetNameAsync(string name);
    Task AddScoreAsync(int points);
    Task<int> GetScoreAsync();
    Task JoinGameAsync(Guid gameId);
}

public interface IGameGrain : IGrainWithGuidKey
{
    Task<GameState> GetStateAsync();
    Task AddPlayerAsync(string playerId);
    Task RemovePlayerAsync(string playerId);
    Task StartAsync();
    Task EndAsync();
    Task<List<string>> GetLeaderboardAsync();
}

public interface IUrlShortenerGrain : IGrainWithStringKey
{
    Task SetUrlAsync(string fullUrl);
    Task<string?> GetUrlAsync();
}
```

## Grain Key Types

| Interface | Key Type | Use Case |
|-----------|---------|----------|
| `IGrainWithStringKey` | `string` | Usernames, slugs, natural IDs |
| `IGrainWithGuidKey` | `Guid` | Auto-generated entity IDs |
| `IGrainWithIntegerKey` | `long` | Sequential/numeric IDs |
| `IGrainWithGuidCompoundKey` | `Guid` + `string` | Composite keys (tenant + entity) |
| `IGrainWithIntegerCompoundKey` | `long` + `string` | Composite keys |

## Grain Implementation
```csharp
public class PlayerGrain : Grain, IPlayerGrain
{
    private readonly IPersistentState<PlayerState> _state;
    private readonly ILogger<PlayerGrain> _logger;

    public PlayerGrain(
        [PersistentState("player", "default")] IPersistentState<PlayerState> state,
        ILogger<PlayerGrain> logger)
    {
        _state = state;
        _logger = logger;
    }

    public Task<PlayerState> GetStateAsync() => Task.FromResult(_state.State);

    public async Task SetNameAsync(string name)
    {
        _state.State.Name = name;
        _state.State.LastUpdated = DateTime.UtcNow;
        await _state.WriteStateAsync();
        _logger.LogInformation("Player {Key} set name to {Name}",
            this.GetPrimaryKeyString(), name);
    }

    public async Task AddScoreAsync(int points)
    {
        _state.State.Score += points;
        _state.State.GamesPlayed++;
        _state.State.LastUpdated = DateTime.UtcNow;
        await _state.WriteStateAsync();
    }

    public Task<int> GetScoreAsync() => Task.FromResult(_state.State.Score);

    public async Task JoinGameAsync(Guid gameId)
    {
        var game = GrainFactory.GetGrain<IGameGrain>(gameId);
        await game.AddPlayerAsync(this.GetPrimaryKeyString());
        _state.State.CurrentGameId = gameId;
        await _state.WriteStateAsync();
    }
}

[GenerateSerializer]
public class PlayerState
{
    [Id(0)] public string Name { get; set; } = "";
    [Id(1)] public int Score { get; set; }
    [Id(2)] public int GamesPlayed { get; set; }
    [Id(3)] public Guid? CurrentGameId { get; set; }
    [Id(4)] public DateTime LastUpdated { get; set; }
}
```

## Grain with Multiple State Objects
```csharp
public class GameGrain : Grain, IGameGrain
{
    private readonly IPersistentState<GameState> _state;
    private readonly IPersistentState<GameStats> _stats;

    public GameGrain(
        [PersistentState("game", "default")] IPersistentState<GameState> state,
        [PersistentState("stats", "default")] IPersistentState<GameStats> stats)
    {
        _state = state;
        _stats = stats;
    }

    public Task<GameState> GetStateAsync() => Task.FromResult(_state.State);

    public async Task AddPlayerAsync(string playerId)
    {
        if (_state.State.Status != GameStatus.Waiting)
            throw new InvalidOperationException("Game already started");

        _state.State.PlayerIds.Add(playerId);
        await _state.WriteStateAsync();
    }

    public async Task StartAsync()
    {
        _state.State.Status = GameStatus.Active;
        _state.State.StartedAt = DateTime.UtcNow;
        await _state.WriteStateAsync();

        _stats.State.TotalGamesStarted++;
        await _stats.WriteStateAsync();
    }

    public async Task<List<string>> GetLeaderboardAsync()
    {
        var tasks = _state.State.PlayerIds.Select(async id =>
        {
            var player = GrainFactory.GetGrain<IPlayerGrain>(id);
            var score = await player.GetScoreAsync();
            return (Id: id, Score: score);
        });

        var results = await Task.WhenAll(tasks);
        return results.OrderByDescending(r => r.Score)
            .Select(r => $"{r.Id}: {r.Score}")
            .ToList();
    }
}

[GenerateSerializer]
public class GameState
{
    [Id(0)] public List<string> PlayerIds { get; set; } = new();
    [Id(1)] public GameStatus Status { get; set; } = GameStatus.Waiting;
    [Id(2)] public DateTime? StartedAt { get; set; }
}

[GenerateSerializer]
public class GameStats
{
    [Id(0)] public int TotalGamesStarted { get; set; }
}

public enum GameStatus { Waiting, Active, Completed }
```

## Timers and Reminders
Timers are volatile (lost on deactivation); reminders are persistent and survive restarts.

```csharp
public class SensorGrain : Grain, ISensorGrain, IRemindable
{
    private readonly IPersistentState<SensorState> _state;
    private IDisposable? _pollingTimer;

    public SensorGrain(
        [PersistentState("sensor", "default")] IPersistentState<SensorState> state)
    {
        _state = state;
    }

    public override async Task OnActivateAsync(CancellationToken ct)
    {
        // Timer: polls every 10 seconds (volatile, lost on deactivation)
        _pollingTimer = RegisterTimer(
            callback: PollSensorAsync,
            state: null,
            dueTime: TimeSpan.FromSeconds(10),
            period: TimeSpan.FromSeconds(10));

        // Reminder: persisted, fires even after silo restart
        await this.RegisterOrUpdateReminder(
            reminderName: "daily-report",
            dueTime: TimeSpan.FromHours(1),
            period: TimeSpan.FromHours(24));

        await base.OnActivateAsync(ct);
    }

    private async Task PollSensorAsync(object? state)
    {
        var reading = await ReadSensorValueAsync();
        _state.State.LastReading = reading;
        _state.State.ReadingCount++;
        await _state.WriteStateAsync();
    }

    public async Task ReceiveReminder(string reminderName, TickStatus status)
    {
        if (reminderName == "daily-report")
        {
            // Generate and send daily sensor report
            var report = $"Sensor {this.GetPrimaryKeyString()}: " +
                         $"{_state.State.ReadingCount} readings, " +
                         $"last value: {_state.State.LastReading}";
            // Send report...
        }
    }

    public override Task OnDeactivateAsync(DeactivationReason reason, CancellationToken ct)
    {
        _pollingTimer?.Dispose();
        return base.OnDeactivateAsync(reason, ct);
    }
}
```

## Orleans Streams
```csharp
// Producer grain
public class TemperatureMonitorGrain : Grain, ITemperatureMonitorGrain
{
    private IAsyncStream<TemperatureReading>? _stream;

    public override Task OnActivateAsync(CancellationToken ct)
    {
        var streamProvider = this.GetStreamProvider("default");
        _stream = streamProvider.GetStream<TemperatureReading>(
            StreamId.Create("temperature", this.GetPrimaryKeyString()));
        return base.OnActivateAsync(ct);
    }

    public async Task RecordTemperatureAsync(double value)
    {
        var reading = new TemperatureReading(
            this.GetPrimaryKeyString(), value, DateTime.UtcNow);
        await _stream!.OnNextAsync(reading);
    }
}

// Consumer grain
public class AlertGrain : Grain, IAlertGrain, IAsyncObserver<TemperatureReading>
{
    public override async Task OnActivateAsync(CancellationToken ct)
    {
        var streamProvider = this.GetStreamProvider("default");
        var stream = streamProvider.GetStream<TemperatureReading>(
            StreamId.Create("temperature", this.GetPrimaryKeyString()));

        await stream.SubscribeAsync(this);
        await base.OnActivateAsync(ct);
    }

    public Task OnNextAsync(TemperatureReading reading, StreamSequenceToken? token)
    {
        if (reading.Value > 100)
        {
            // Trigger alert
        }
        return Task.CompletedTask;
    }

    public Task OnErrorAsync(Exception ex) => Task.CompletedTask;
    public Task OnCompletedAsync() => Task.CompletedTask;
}

[GenerateSerializer]
public record TemperatureReading(
    [property: Id(0)] string SensorId,
    [property: Id(1)] double Value,
    [property: Id(2)] DateTime Timestamp);
```

## Calling Grains from ASP.NET Core
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Host.UseOrleans(silo => silo.UseLocalhostClustering());

var app = builder.Build();

app.MapGet("/players/{id}", async (string id, IGrainFactory grains) =>
{
    var grain = grains.GetGrain<IPlayerGrain>(id);
    var state = await grain.GetStateAsync();
    return Results.Ok(state);
});

app.MapPost("/players/{id}/score", async (string id, ScoreRequest req, IGrainFactory grains) =>
{
    var grain = grains.GetGrain<IPlayerGrain>(id);
    await grain.AddScoreAsync(req.Points);
    return Results.Ok();
});

app.MapPost("/games", async (IGrainFactory grains) =>
{
    var gameId = Guid.NewGuid();
    var grain = grains.GetGrain<IGameGrain>(gameId);
    return Results.Created($"/games/{gameId}", new { gameId });
});

app.Run();

record ScoreRequest(int Points);
```

## Best Practices
- Design grains around natural entity boundaries (one grain per user, per device, per game session) with a single responsibility; avoid "god grains" that manage unrelated state.
- Use `[PersistentState("name", "storage")]` constructor injection for grain state rather than inheriting from `Grain<TState>`, which provides more flexibility and supports multiple state objects per grain.
- Mark all state classes and DTOs with `[GenerateSerializer]` and assign explicit `[Id(n)]` attributes to each serialized property to ensure forward-compatible serialization across deployments.
- Use `GrainFactory.GetGrain<T>(key)` inside grains to call other grains rather than injecting them; Orleans handles activation, routing, and lifecycle automatically.
- Use reminders (persistent, survive restarts) for important scheduled operations like daily reports, and timers (volatile, per-activation) for frequent polling that can be recreated on reactivation.
- Avoid blocking calls or `Task.Result` inside grain methods because grains are single-threaded; blocking prevents other messages from being processed and can cause deadlocks.
- Use `UseLocalhostClustering()` and `AddMemoryGrainStorage()` only for development; switch to `UseAzureStorageClustering()` or `UseAdoNetClustering()` for production multi-silo deployments.
- Co-host Orleans silos with ASP.NET Core using `builder.Host.UseOrleans()` to expose grain functionality via HTTP endpoints using `IGrainFactory` from dependency injection.
- Call `WriteStateAsync()` after every state mutation rather than batching writes, because a silo crash between mutations would lose uncommitted changes.
- Use Orleans Streams for event-driven communication between grains rather than direct grain-to-grain calls when the producer should not know about or depend on consumers.
