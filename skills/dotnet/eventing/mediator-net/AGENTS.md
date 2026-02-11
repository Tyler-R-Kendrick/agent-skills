# Mediator.NET

## Overview
Mediator.NET (the `Mediator` NuGet package by Martin Othamar) is a source-generated implementation of the mediator pattern for .NET. Unlike MediatR which uses runtime reflection for handler discovery, Mediator.NET generates the dispatch code at compile time using Roslyn source generators. This results in zero-allocation dispatch, AOT compatibility, and compile-time verification that all handlers are registered. It supports commands, queries, notifications, and pipeline behaviors with an API surface intentionally similar to MediatR.

## NuGet Packages
- `Mediator` -- core library with source generator
- `Mediator.Abstractions` -- interfaces for shared contract assemblies

## Registration
```csharp
using Mediator;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// AddMediator is generated at compile time
builder.Services.AddMediator(options =>
{
    options.ServiceLifetime = ServiceLifetime.Scoped;
});

var app = builder.Build();
app.Run();
```

## Commands
```csharp
using Mediator;

// Command with response
public sealed record CreateProductCommand(
    string Name,
    decimal Price,
    string Category) : ICommand<CreateProductResult>;

public sealed record CreateProductResult(Guid ProductId);

// Command handler
public sealed class CreateProductHandler
    : ICommandHandler<CreateProductCommand, CreateProductResult>
{
    private readonly AppDbContext _db;

    public CreateProductHandler(AppDbContext db) => _db = db;

    public async ValueTask<CreateProductResult> Handle(
        CreateProductCommand command,
        CancellationToken ct)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = command.Name,
            Price = command.Price,
            Category = command.Category
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync(ct);

        return new CreateProductResult(product.Id);
    }
}
```

## Queries
```csharp
using Mediator;

// Query definition
public sealed record GetProductQuery(Guid ProductId) : IQuery<ProductDto?>;

public sealed record ProductDto(Guid Id, string Name, decimal Price, string Category);

// Query handler
public sealed class GetProductHandler : IQueryHandler<GetProductQuery, ProductDto?>
{
    private readonly AppDbContext _db;

    public GetProductHandler(AppDbContext db) => _db = db;

    public async ValueTask<ProductDto?> Handle(GetProductQuery query, CancellationToken ct)
    {
        return await _db.Products
            .AsNoTracking()
            .Where(p => p.Id == query.ProductId)
            .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category))
            .FirstOrDefaultAsync(ct);
    }
}
```

## Notifications
```csharp
using Mediator;

// Notification definition
public sealed record ProductCreatedNotification(
    Guid ProductId,
    string Name,
    string Category) : INotification;

// Handler 1: index for search
public sealed class IndexProductHandler
    : INotificationHandler<ProductCreatedNotification>
{
    private readonly ISearchIndexService _search;

    public IndexProductHandler(ISearchIndexService search) => _search = search;

    public async ValueTask Handle(
        ProductCreatedNotification notification,
        CancellationToken ct)
    {
        await _search.IndexAsync(new SearchDocument
        {
            Id = notification.ProductId.ToString(),
            Title = notification.Name,
            Tags = new[] { notification.Category }
        }, ct);
    }
}

// Handler 2: send notification
public sealed class NotifyAdminHandler
    : INotificationHandler<ProductCreatedNotification>
{
    private readonly ILogger<NotifyAdminHandler> _logger;

    public NotifyAdminHandler(ILogger<NotifyAdminHandler> logger) => _logger = logger;

    public ValueTask Handle(
        ProductCreatedNotification notification,
        CancellationToken ct)
    {
        _logger.LogInformation("New product created: {Name} ({Category})",
            notification.Name, notification.Category);
        return ValueTask.CompletedTask;
    }
}
```

## Pipeline Behaviors
```csharp
using Mediator;

// Validation behavior
public sealed class ValidationBehavior<TMessage, TResponse>
    : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IMessage
{
    private readonly IEnumerable<IValidator<TMessage>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TMessage>> validators)
        => _validators = validators;

    public async ValueTask<TResponse> Handle(
        TMessage message,
        MessageHandlerDelegate<TMessage, TResponse> next,
        CancellationToken ct)
    {
        foreach (var validator in _validators)
        {
            var result = await validator.ValidateAsync(message, ct);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);
        }

        return await next(message, ct);
    }
}

// Logging behavior
public sealed class LoggingBehavior<TMessage, TResponse>
    : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IMessage
{
    private readonly ILogger<LoggingBehavior<TMessage, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TMessage, TResponse>> logger)
        => _logger = logger;

    public async ValueTask<TResponse> Handle(
        TMessage message,
        MessageHandlerDelegate<TMessage, TResponse> next,
        CancellationToken ct)
    {
        var name = typeof(TMessage).Name;
        _logger.LogInformation("Handling {Message}", name);
        var sw = Stopwatch.StartNew();

        var response = await next(message, ct);

        _logger.LogInformation("Handled {Message} in {Elapsed}ms",
            name, sw.ElapsedMilliseconds);
        return response;
    }
}
```

## ASP.NET Core Integration
```csharp
using Mediator;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMediator();

var app = builder.Build();

app.MapPost("/products", async (
    CreateProductCommand cmd,
    IMediator mediator) =>
{
    var result = await mediator.Send(cmd);
    return Results.Created($"/products/{result.ProductId}", result);
});

app.MapGet("/products/{id:guid}", async (Guid id, IMediator mediator) =>
{
    var product = await mediator.Send(new GetProductQuery(id));
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.Run();
```

## Mediator.NET vs MediatR

| Feature | Mediator.NET | MediatR |
|---------|-------------|---------|
| Handler discovery | Source generation (compile-time) | Runtime reflection |
| Return type | `ValueTask<T>` | `Task<T>` |
| AOT compatible | Yes (no reflection) | Limited |
| Message types | `ICommand<T>`, `IQuery<T>`, `INotification` | `IRequest<T>`, `INotification` |
| Pipeline behaviors | `IPipelineBehavior<TMessage, TResponse>` | `IPipelineBehavior<TRequest, TResponse>` |
| Allocations | Zero-allocation dispatch | Reflection-based allocation |
| Ecosystem | Growing | Mature, large ecosystem |
| Compile-time safety | Missing handler = compile error | Missing handler = runtime error |

## Best Practices
- Use `ICommand<TResponse>` for operations that mutate state and `IQuery<TResponse>` for read-only operations, leveraging the semantic distinction that Mediator.NET provides over MediatR's single `IRequest<T>`.
- Return `ValueTask<T>` from handlers for synchronous-fast-path optimization; Mediator.NET uses `ValueTask` throughout, reducing allocations for handlers that complete synchronously.
- Register the mediator with `ServiceLifetime.Scoped` to align handler lifetimes with per-request DI scopes and EF Core DbContext lifetimes.
- Add pipeline behaviors for cross-cutting concerns (validation, logging, transaction management) exactly as with MediatR; the API is intentionally similar.
- Keep message types in a separate `Contracts` or `Abstractions` project referencing `Mediator.Abstractions` so consuming assemblies do not need the source generator.
- Use the compile-time error when a handler is missing as an advantage: never ship code with unhandled commands or queries.
- Prefer Mediator.NET over MediatR when targeting NativeAOT or when zero-allocation dispatch is a performance requirement.
- Avoid putting business logic in pipeline behaviors; they should only handle infrastructure concerns (logging, validation, caching).
- Publish notifications after the primary operation succeeds (e.g., after `SaveChangesAsync`) to avoid notifying handlers about uncommitted state.
- Test handlers by resolving `IMediator` from a test service provider with `AddMediator()` rather than manually constructing handlers, ensuring pipeline behaviors execute.
