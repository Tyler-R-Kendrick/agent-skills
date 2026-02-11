---
name: command-query
description: |
  Use when implementing Command Query Separation (CQS) or CQRS patterns to separate read and write operations in .NET applications.
  USE FOR: separating read/write models, CQS pattern implementation, CQRS architecture, dedicated command and query handlers, read/write model optimization
  DO NOT USE FOR: simple CRUD without separation concerns (use entity-framework-core), distributed messaging between services (use masstransit or nservicebus), in-process mediator with pipeline behaviors (use mediatr)
license: MIT
metadata:
  displayName: "Command Query Separation"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "CQRS Pattern Documentation"
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs"
  - title: ".NET Architecture Guidance"
    url: "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/"
---

# Command Query Separation (CQS / CQRS)

## Overview
Command Query Separation (CQS) is a principle that states every method should either be a command that performs an action or a query that returns data, but never both. CQRS (Command Query Responsibility Segregation) extends CQS to the architectural level by using separate models for reading and writing data. This pattern improves scalability, testability, and clarity by ensuring commands handle state changes and queries handle data retrieval independently.

## CQS vs CQRS

| Aspect | CQS | CQRS |
|--------|-----|------|
| Scope | Method-level principle | Architectural pattern |
| Models | Single model | Separate read/write models |
| Data store | Shared database | Can use separate stores |
| Complexity | Low | Higher (eventual consistency) |
| Best for | Any codebase | High-scale read/write asymmetry |

## Defining Abstractions
```csharp
// Command: no return value, performs a state change
public interface ICommand { }

public interface ICommandHandler<in TCommand> where TCommand : ICommand
{
    Task HandleAsync(TCommand command, CancellationToken ct = default);
}

// Command with result (for returning IDs or status)
public interface ICommand<TResult> { }

public interface ICommandHandler<in TCommand, TResult> where TCommand : ICommand<TResult>
{
    Task<TResult> HandleAsync(TCommand command, CancellationToken ct = default);
}

// Query: always returns data, never modifies state
public interface IQuery<TResult> { }

public interface IQueryHandler<in TQuery, TResult> where TQuery : IQuery<TResult>
{
    Task<TResult> HandleAsync(TQuery query, CancellationToken ct = default);
}
```

## Command Implementation
```csharp
// Command definition
public sealed record CreateUserCommand(string Email, string Name) : ICommand<Guid>;

// Command handler
public sealed class CreateUserCommandHandler : ICommandHandler<CreateUserCommand, Guid>
{
    private readonly AppDbContext _db;

    public CreateUserCommandHandler(AppDbContext db) => _db = db;

    public async Task<Guid> HandleAsync(CreateUserCommand command, CancellationToken ct = default)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = command.Email,
            Name = command.Name,
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync(ct);

        return user.Id;
    }
}
```

## Query Implementation
```csharp
// Query definition
public sealed record GetUserByIdQuery(Guid UserId) : IQuery<UserDto?>;

// Read-only DTO
public sealed record UserDto(Guid Id, string Email, string Name, DateTime CreatedAt);

// Query handler using a read-optimized path
public sealed class GetUserByIdQueryHandler : IQueryHandler<GetUserByIdQuery, UserDto?>
{
    private readonly IDbConnection _connection;

    public GetUserByIdQueryHandler(IDbConnection connection) => _connection = connection;

    public async Task<UserDto?> HandleAsync(GetUserByIdQuery query, CancellationToken ct = default)
    {
        const string sql = "SELECT Id, Email, Name, CreatedAt FROM Users WHERE Id = @UserId";
        return await _connection.QuerySingleOrDefaultAsync<UserDto>(sql, new { query.UserId });
    }
}
```

## Dispatcher Implementation
```csharp
using Microsoft.Extensions.DependencyInjection;

public interface IDispatcher
{
    Task SendAsync<TCommand>(TCommand command, CancellationToken ct = default)
        where TCommand : ICommand;

    Task<TResult> SendAsync<TResult>(ICommand<TResult> command, CancellationToken ct = default);

    Task<TResult> QueryAsync<TResult>(IQuery<TResult> query, CancellationToken ct = default);
}

public sealed class Dispatcher : IDispatcher
{
    private readonly IServiceProvider _provider;

    public Dispatcher(IServiceProvider provider) => _provider = provider;

    public async Task SendAsync<TCommand>(TCommand command, CancellationToken ct = default)
        where TCommand : ICommand
    {
        var handler = _provider.GetRequiredService<ICommandHandler<TCommand>>();
        await handler.HandleAsync(command, ct);
    }

    public async Task<TResult> SendAsync<TResult>(ICommand<TResult> command, CancellationToken ct = default)
    {
        var handlerType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(TResult));
        dynamic handler = _provider.GetRequiredService(handlerType);
        return await handler.HandleAsync((dynamic)command, ct);
    }

    public async Task<TResult> QueryAsync<TResult>(IQuery<TResult> query, CancellationToken ct = default)
    {
        var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));
        dynamic handler = _provider.GetRequiredService(handlerType);
        return await handler.HandleAsync((dynamic)query, ct);
    }
}
```

## DI Registration
```csharp
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IDispatcher, Dispatcher>();

// Auto-register all handlers from the assembly
builder.Services.Scan(scan => scan
    .FromAssemblyOf<CreateUserCommandHandler>()
    .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
    .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<,>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
    .AddClasses(c => c.AssignableTo(typeof(IQueryHandler<,>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime());

var app = builder.Build();

app.MapPost("/users", async (CreateUserCommand cmd, IDispatcher dispatcher) =>
{
    var userId = await dispatcher.SendAsync<Guid>(cmd);
    return Results.Created($"/users/{userId}", new { id = userId });
});

app.MapGet("/users/{id:guid}", async (Guid id, IDispatcher dispatcher) =>
{
    var user = await dispatcher.QueryAsync(new GetUserByIdQuery(id));
    return user is not null ? Results.Ok(user) : Results.NotFound();
});

app.Run();
```

## Full CQRS with Separate Read/Write Stores
```csharp
// Write model (EF Core)
public class UserWriteModel
{
    public Guid Id { get; set; }
    public string Email { get; set; } = default!;
    public string Name { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
    public List<UserEvent> Events { get; set; } = new();
}

// Read model (denormalized, optimized for queries)
public class UserReadModel
{
    public Guid Id { get; set; }
    public string Email { get; set; } = default!;
    public string DisplayName { get; set; } = default!;
    public int OrderCount { get; set; }
    public DateTime LastActive { get; set; }
}

// Synchronization: project write events to read model
public sealed class UserProjection
{
    private readonly ReadModelDbContext _readDb;

    public UserProjection(ReadModelDbContext readDb) => _readDb = readDb;

    public async Task ProjectAsync(UserCreatedEvent evt, CancellationToken ct)
    {
        _readDb.Users.Add(new UserReadModel
        {
            Id = evt.UserId,
            Email = evt.Email,
            DisplayName = evt.Name,
            OrderCount = 0,
            LastActive = evt.CreatedAt
        });
        await _readDb.SaveChangesAsync(ct);
    }
}
```

## Cross-Cutting with Decorators
```csharp
// Logging decorator
public sealed class LoggingCommandHandler<TCommand> : ICommandHandler<TCommand>
    where TCommand : ICommand
{
    private readonly ICommandHandler<TCommand> _inner;
    private readonly ILogger<LoggingCommandHandler<TCommand>> _logger;

    public LoggingCommandHandler(ICommandHandler<TCommand> inner,
        ILogger<LoggingCommandHandler<TCommand>> logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public async Task HandleAsync(TCommand command, CancellationToken ct = default)
    {
        _logger.LogInformation("Handling {Command}", typeof(TCommand).Name);
        var sw = Stopwatch.StartNew();
        await _inner.HandleAsync(command, ct);
        _logger.LogInformation("Handled {Command} in {Elapsed}ms",
            typeof(TCommand).Name, sw.ElapsedMilliseconds);
    }
}

// Validation decorator
public sealed class ValidationCommandHandler<TCommand, TResult>
    : ICommandHandler<TCommand, TResult>
    where TCommand : ICommand<TResult>
{
    private readonly ICommandHandler<TCommand, TResult> _inner;
    private readonly IEnumerable<IValidator<TCommand>> _validators;

    public ValidationCommandHandler(ICommandHandler<TCommand, TResult> inner,
        IEnumerable<IValidator<TCommand>> validators)
    {
        _inner = inner;
        _validators = validators;
    }

    public async Task<TResult> HandleAsync(TCommand command, CancellationToken ct = default)
    {
        var failures = _validators
            .Select(v => v.Validate(command))
            .SelectMany(r => r.Errors)
            .Where(f => f is not null)
            .ToList();

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return await _inner.HandleAsync(command, ct);
    }
}
```

## Best Practices
- Commands should perform state changes and return at most an identifier or status; never return full domain entities from command handlers.
- Queries must never modify state; enforce this by giving query handlers read-only database connections or `AsNoTracking()` EF contexts.
- Use separate DTOs for query results rather than returning domain entities, to decouple the read contract from the write model.
- Keep command and query handlers as thin orchestrators; delegate complex domain logic to domain services or aggregate methods.
- In full CQRS, accept eventual consistency between write and read stores; design the UI to accommodate brief propagation delays.
- Apply cross-cutting concerns (logging, validation, authorization) via handler decorators or pipeline middleware rather than duplicating logic in every handler.
- Name commands as imperative verbs (`CreateUser`, `PlaceOrder`) and queries as questions (`GetUserById`, `ListActiveOrders`) to make intent self-documenting.
- Register handlers with scoped lifetime to align with per-request database contexts and avoid shared state across requests.
- Validate commands before executing them, preferably in a decorator or pipeline step, so invalid commands never reach the handler.
- Use Dapper or raw SQL for query handlers when read performance is critical, reserving EF Core for the write side where change tracking is valuable.
