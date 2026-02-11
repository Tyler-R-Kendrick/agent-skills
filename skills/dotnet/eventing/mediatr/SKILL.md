---
name: mediatr
description: |
  Use when implementing in-process mediator, CQRS, and pipeline behavior patterns with MediatR in .NET applications.
  USE FOR: in-process command/query dispatch, CQRS with pipeline behaviors, notification fan-out, cross-cutting concern pipelines (validation, logging, caching), decoupling controllers from handlers
  DO NOT USE FOR: distributed messaging across services (use masstransit or nservicebus), actor-based concurrency (use akka-net), external message broker integration (use rebus)
license: MIT
metadata:
  displayName: "MediatR"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "MediatR GitHub Repository"
    url: "https://github.com/jbogard/MediatR"
  - title: "MediatR NuGet Package"
    url: "https://www.nuget.org/packages/MediatR"
---

# MediatR

## Overview
MediatR is a simple, unambitious in-process mediator library for .NET. It decouples the sender of a request from its handler using `IRequest<TResponse>` for request/response, `INotification` for publish/subscribe fan-out, and `IPipelineBehavior<,>` for cross-cutting middleware. MediatR is commonly used to implement CQRS patterns within a single application, keeping controllers thin and handlers focused.

## NuGet Packages
- `MediatR` -- core library with mediator, handlers, and pipeline behaviors
- `MediatR.Extensions.FluentValidation.AspNetCore` -- FluentValidation integration (community)

## Registration
```csharp
using MediatR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
});

var app = builder.Build();
app.Run();
```

## Commands (Request/Response)
```csharp
using MediatR;

// Command with result
public sealed record CreateOrderCommand(
    string CustomerId,
    List<OrderItemDto> Items) : IRequest<CreateOrderResult>;

public sealed record OrderItemDto(string ProductId, int Quantity, decimal UnitPrice);
public sealed record CreateOrderResult(Guid OrderId, decimal Total);

// Command handler
public sealed class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResult>
{
    private readonly AppDbContext _db;

    public CreateOrderHandler(AppDbContext db) => _db = db;

    public async Task<CreateOrderResult> Handle(
        CreateOrderCommand request,
        CancellationToken ct)
    {
        var total = request.Items.Sum(i => i.Quantity * i.UnitPrice);
        var order = new Order
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Total = total,
            Status = OrderStatus.Placed,
            CreatedAt = DateTime.UtcNow
        };

        _db.Orders.Add(order);
        await _db.SaveChangesAsync(ct);

        return new CreateOrderResult(order.Id, total);
    }
}
```

## Queries
```csharp
// Query definition
public sealed record GetOrderQuery(Guid OrderId) : IRequest<OrderDto?>;

public sealed record OrderDto(
    Guid Id,
    string CustomerId,
    decimal Total,
    string Status,
    DateTime CreatedAt);

// Query handler with read-only optimization
public sealed class GetOrderHandler : IRequestHandler<GetOrderQuery, OrderDto?>
{
    private readonly AppDbContext _db;

    public GetOrderHandler(AppDbContext db) => _db = db;

    public async Task<OrderDto?> Handle(GetOrderQuery request, CancellationToken ct)
    {
        return await _db.Orders
            .AsNoTracking()
            .Where(o => o.Id == request.OrderId)
            .Select(o => new OrderDto(o.Id, o.CustomerId, o.Total,
                o.Status.ToString(), o.CreatedAt))
            .FirstOrDefaultAsync(ct);
    }
}
```

## Notifications (Pub/Sub)
```csharp
// Notification (multiple handlers)
public sealed record OrderPlacedNotification(
    Guid OrderId,
    string CustomerId,
    decimal Total) : INotification;

// Handler 1: send email
public sealed class SendOrderEmail : INotificationHandler<OrderPlacedNotification>
{
    private readonly IEmailService _email;

    public SendOrderEmail(IEmailService email) => _email = email;

    public async Task Handle(OrderPlacedNotification notification, CancellationToken ct)
    {
        await _email.SendAsync(notification.CustomerId,
            "Order Confirmed", $"Order {notification.OrderId} total: {notification.Total:C}", ct);
    }
}

// Handler 2: update analytics
public sealed class TrackOrderAnalytics : INotificationHandler<OrderPlacedNotification>
{
    private readonly IAnalyticsService _analytics;

    public TrackOrderAnalytics(IAnalyticsService analytics) => _analytics = analytics;

    public async Task Handle(OrderPlacedNotification notification, CancellationToken ct)
    {
        await _analytics.TrackAsync("OrderPlaced", new
        {
            notification.OrderId,
            notification.Total
        }, ct);
    }
}

// Publishing from a command handler
public sealed class CreateOrderWithNotification
    : IRequestHandler<CreateOrderCommand, CreateOrderResult>
{
    private readonly AppDbContext _db;
    private readonly IPublisher _publisher;

    public CreateOrderWithNotification(AppDbContext db, IPublisher publisher)
    {
        _db = db;
        _publisher = publisher;
    }

    public async Task<CreateOrderResult> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        var order = new Order { Id = Guid.NewGuid(), CustomerId = request.CustomerId };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync(ct);

        await _publisher.Publish(
            new OrderPlacedNotification(order.Id, order.CustomerId, order.Total), ct);

        return new CreateOrderResult(order.Id, order.Total);
    }
}
```

## Pipeline Behaviors
```csharp
using FluentValidation;
using MediatR;

// Validation behavior
public sealed class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        => _validators = validators;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);
            var results = await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(context, ct)));

            var failures = results
                .SelectMany(r => r.Errors)
                .Where(f => f is not null)
                .ToList();

            if (failures.Count > 0)
                throw new ValidationException(failures);
        }

        return await next();
    }
}

// Logging behavior
public sealed class LoggingBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
        => _logger = logger;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var requestName = typeof(TRequest).Name;
        _logger.LogInformation("Handling {RequestName}", requestName);

        var sw = Stopwatch.StartNew();
        var response = await next();
        sw.Stop();

        _logger.LogInformation("Handled {RequestName} in {Elapsed}ms",
            requestName, sw.ElapsedMilliseconds);

        return response;
    }
}

// Caching behavior
public interface ICacheableQuery
{
    string CacheKey { get; }
    TimeSpan? CacheDuration { get; }
}

public sealed class CachingBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : ICacheableQuery
{
    private readonly IDistributedCache _cache;

    public CachingBehavior(IDistributedCache cache) => _cache = cache;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var cached = await _cache.GetStringAsync(request.CacheKey, ct);
        if (cached is not null)
            return JsonSerializer.Deserialize<TResponse>(cached)!;

        var response = await next();

        await _cache.SetStringAsync(
            request.CacheKey,
            JsonSerializer.Serialize(response),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = request.CacheDuration ?? TimeSpan.FromMinutes(5)
            }, ct);

        return response;
    }
}
```

## ASP.NET Core Integration
```csharp
var app = builder.Build();

app.MapPost("/orders", async (CreateOrderCommand cmd, IMediator mediator) =>
{
    var result = await mediator.Send(cmd);
    return Results.Created($"/orders/{result.OrderId}", result);
});

app.MapGet("/orders/{id:guid}", async (Guid id, IMediator mediator) =>
{
    var order = await mediator.Send(new GetOrderQuery(id));
    return order is not null ? Results.Ok(order) : Results.NotFound();
});

app.Run();
```

## FluentValidation Integration
```csharp
using FluentValidation;

public sealed class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty()
            .MaximumLength(128);

        RuleFor(x => x.Items)
            .NotEmpty()
            .WithMessage("Order must contain at least one item.");

        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(i => i.Quantity).GreaterThan(0);
            item.RuleFor(i => i.UnitPrice).GreaterThan(0);
        });
    }
}

// Register validators
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
```

## Best Practices
- Keep handlers focused on a single responsibility: one handler per command or query, with no shared mutable state between handlers.
- Use `IPipelineBehavior<,>` for cross-cutting concerns (validation, logging, caching, authorization) rather than duplicating logic in every handler.
- Separate commands (`IRequest<TResponse>`) from queries conceptually even though they use the same interface; commands should mutate state and queries should read without side effects.
- Use `INotification` and `INotificationHandler<>` for in-process fan-out events; for cross-service events, publish to a message broker instead.
- Register pipeline behaviors in the correct order (e.g., logging first, then validation, then caching) since they execute as a nested middleware chain.
- Inject `IMediator` or `ISender` into controllers/endpoints, not into domain services; MediatR is a composition root concern, not a domain concern.
- Use `CancellationToken` consistently by passing it through from the request to the handler and to all async calls within the handler.
- Prefer `ISender` (for `Send`) or `IPublisher` (for `Publish`) over the full `IMediator` interface to express minimal dependency.
- Validate command inputs in a `ValidationBehavior` pipeline step using FluentValidation so handlers can assume valid input.
- Avoid using MediatR for inter-service communication; it is strictly in-process -- use MassTransit, NServiceBus, or Rebus for distributed messaging.
